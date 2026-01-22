"use client";

import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { UserSmCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useToast } from "@/lib/context/toast/ToastContext";
import { LIMIT } from "@/lib/env";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Like, LikeBase, LikeWithRelations } from "@/lib/schema/like/like";
import type { AuthContext } from "@/lib/utils/auth-context";
import type { APIResponse } from "@/service/api-client";
import apiRequest from "@/service/api-client";
import MyAvatarGroup from "../image/my-avatar-group";
import { UserSmCardSkeleton } from "../skeletons/user-card-skeleton";

interface LikesDialogProps {
  target_id: string;
  auth: AuthContext;
  dialogTriggerSize?: "sm" | "default" | number;
  dialogTriggerType?: "icon" | "groupUsers" | "text";
  likeButton?: boolean;
  className?: string;
}

const LikesDialog = ({
  dialogTriggerSize = "default",
  dialogTriggerType = "icon",
  target_id,
  auth,
  likeButton = false,
  className,
}: LikesDialogProps) => {
  const [isLiked, setIsLiked] = useState<LikeWithRelations | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [likes, setLikes] = useState<APIResponse<Paginated<LikeWithRelations>>>(
    {
      isLoading: false,
      data: undefined,
    },
  );
  const [isProcessingLike, setIsProcessingLike] = useState(false);

  const { showToast } = useToast();

  // Fetch likes and user's like status
  const fetchLikes = useCallback(async () => {
    if (!target_id || !auth.token || !auth.schoolToken) return;

    setLikes((prev) => ({ ...prev, isLoading: true }));
    setPage(1);

    try {
      const [likesResponse, myLikeResponse] = await Promise.all([
        apiRequest<void, Paginated<LikeWithRelations>>(
          "get",
          `/school/likes/others?field=target_id&value=${target_id}&limit=${LIMIT}&page=1`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        ),
        apiRequest<void, LikeWithRelations>(
          "get",
          `/school/likes/others/match?field=target_id&value=${target_id}&field=actor.id&value=${auth?.school?.member?._id}`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        ),
      ]);

      if (myLikeResponse.data) {
        setIsLiked(myLikeResponse.data);
      } else {
        setIsLiked(undefined);
      }

      setLikes(likesResponse);
    } catch (error) {
      console.error("Error fetching likes:", error);
      setLikes((prev) => ({ ...prev, isLoading: false }));
      showToast({
        title: "Error",
        description: "Failed to load likes",
        type: "error",
      });
    }
  }, [
    target_id,
    auth.token,
    auth.schoolToken,
    auth?.school?.member?._id,
    showToast,
  ]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  // Handle load more likes
  const handleLoadMore = async () => {
    if (!likes.data || isLoadingMore) return;

    const nextPage = page + 1;
    if (nextPage > likes.data.total_pages) return;

    setIsLoadingMore(true);

    try {
      const res = await apiRequest<void, Paginated<LikeWithRelations>>(
        "get",
        `/school/likes/others?field=target_id&value=${target_id}&limit=${LIMIT}&page=${nextPage}`,
        undefined,
        { token: auth.token, schoolToken: auth.schoolToken },
      );

      if (res.data) {
        const responseData = res.data;
        setLikes((prev) => {
          if (!prev.data) return prev;

          return {
            ...prev,
            data: {
              ...prev.data,
              current_page: responseData.current_page,
              data: [...prev.data.data, ...responseData.data],
            },
          };
        });

        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more likes:", error);
      showToast({
        title: "Error",
        description: "Failed to load more likes",
        type: "error",
      });
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Handle like/unlike action
  const handleLike = async () => {
    if (!target_id || !auth.token || !auth.schoolToken || isProcessingLike)
      return;

    const actorId = auth.school?.member?._id || auth.user.id;
    setIsProcessingLike(true);

    try {
      // Unlike if already liked
      if (isLiked?._id) {
        const previousIsLiked = isLiked;
        const previousLikesData = likes.data;

        // Optimistic update - remove like and decrement total
        setIsLiked(undefined);
        setLikes((prev) => {
          if (!prev.data) return prev;

          return {
            ...prev,
            data: {
              ...prev.data,
              total: prev.data.total - 1,
              data: prev.data.data.filter((like) => like._id !== isLiked._id),
            },
          };
        });

        const deleteResponse = await apiRequest<void, Like>(
          "delete",
          `/school/likes/${isLiked._id}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (!deleteResponse.data) {
          // Revert on error - restore previous state
          setIsLiked(previousIsLiked);
          setLikes((prev) => ({
            ...prev,
            data: previousLikesData,
          }));

          showToast({
            title: "Error",
            description: deleteResponse.message || "Failed to unlike",
            type: "error",
          });
        }
      } else {
        // Like - create new like
        const actorRole =
          auth.school?.member?.user_type === "USER"
            ? "SCHOOLSTAFF"
            : auth.school?.member?.user_type || auth.user.role || "STUDENT";

        const optimisticLike: LikeWithRelations = {
          _id: `temp-${Date.now()}`,
          target_id,
          actor: {
            id: actorId,
            role: actorRole,
          },
          author_user: auth.school?.member,
        };

        const previousLikesData = likes.data;

        // Optimistic update - add like and increment total
        setIsLiked(optimisticLike);
        setLikes((prev) => {
          if (!prev.data) {
            // Initialize if data doesn't exist
            return {
              ...prev,
              data: {
                total: 1,
                current_page: 1,
                total_pages: 1,
                data: [optimisticLike],
              },
            };
          }

          return {
            ...prev,
            data: {
              ...prev.data,
              total: prev.data.total + 1,
              data: [optimisticLike, ...prev.data.data],
            },
          };
        });

        const likeResponse = await apiRequest<LikeBase, Like>(
          "post",
          `/school/likes`,
          {
            target_id,
            actor: {
              id: actorId,
              role: actorRole,
            },
          },
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (likeResponse.data) {
          const newLike: LikeWithRelations = {
            ...likeResponse.data,
            author_user: auth.school?.member,
          };

          // Replace optimistic like with real one (DON'T update total again)
          setIsLiked(newLike);
          setLikes((prev) => {
            if (!prev.data) return prev;

            return {
              ...prev,
              data: {
                ...prev.data,
                // Keep the same total - don't increment again
                data: prev.data.data.map((like) =>
                  like._id === optimisticLike._id ? newLike : like,
                ),
              },
            };
          });
        } else {
          // Revert on error - restore previous state
          setIsLiked(undefined);
          setLikes((prev) => ({
            ...prev,
            data: previousLikesData,
          }));

          showToast({
            title: "Error",
            description: likeResponse.message || "Failed to like",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error handling like:", error);

      // Revert on error
      setIsLiked(undefined);
      await fetchLikes(); // Refresh to ensure consistency

      showToast({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setIsProcessingLike(false);
    }
  };

  // Render like button only
  if (likeButton) {
    return (
      <Button
        title="Like"
        library="daisy"
        variant="ghost"
        size="md"
        className={className}
        onClick={handleLike}
        disabled={isProcessingLike}
      >
        {isLiked ? (
          <FaHeart className="text-primary" size={20} />
        ) : (
          <FaRegHeart size={20} />
        )}
      </Button>
    );
  }

  const likesCount = likes.data?.total ?? 0;
  const currentLikesShown = likes.data?.data.length ?? 0;
  const remainingCount = Math.max(0, likesCount - currentLikesShown);

  // Render dialog trigger based on type
  const renderDialogTrigger = () => {
    switch (dialogTriggerType) {
      case "text":
        return <span>{likesCount} Likes</span>;

      case "groupUsers": {
        const previewLikes = likes.data?.data.slice(0, 3) ?? [];
        return (
          <div className="justify-start flex flex-row w-full items-center gap-2 cursor-pointer">
            <MyAvatarGroup
              type="cycle"
              className="w-fit"
              size="2xs"
              limit={3}
              items={previewLikes.map((like) => ({
                src: like?.author_user?.image,
                alt: like?.author_user?.name || "User",
              }))}
            />
            <Label>{likesCount} Likes</Label>
          </div>
        );
      }

      default: {
        const iconSize =
          dialogTriggerSize === "sm"
            ? 16
            : dialogTriggerSize === "default"
              ? 28
              : dialogTriggerSize;

        return (
          <Button
            type="button"
            variant="ghost"
            className="items-center flex gap-1"
            library="daisy"
            size={dialogTriggerSize === "sm" ? "sm" : "md"}
          >
            <FaRegHeart size={iconSize} />
            <span>{likesCount}</span>
          </Button>
        );
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{renderDialogTrigger()}</DialogTrigger>

      <DialogContent className="p-0">
        <DialogHeader className="px-6 py-4">
          <DialogTitle>{likesCount} Likes</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-6 space-y-2">
          {likes.isLoading ? (
            <div className="flex flex-col gap-2">
              {[...Array(LIMIT)].map((_, i) => (
                <UserSmCardSkeleton key={i} />
              ))}
            </div>
          ) : likes.data && likes.data.data.length > 0 ? (
            <div className="flex flex-col gap-2">
              {likes.data.data.map((like) => (
                <UserSmCard
                  key={like._id}
                  name={like?.author_user?.name || "Unknown User"}
                  image={like?.author_user?.image}
                  role={like?.author_user?.user_type}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No likes yet
            </div>
          )}

          {/* Load More Button */}
          {remainingCount > 0 && !likes.isLoading && (
            <Button
              size="sm"
              className="w-full"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Loading..." : `View ${remainingCount} more`}
            </Button>
          )}
        </div>

        <div className="min-h-20" />

        <DialogFooter className="px-6 pb-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LikesDialog;
