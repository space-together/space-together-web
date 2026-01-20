"use client";
import type { Announcement } from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { Locale } from "@/i18n";
import { useToast } from "@/lib/context/toast/ToastContext";
import { LIMIT } from "@/lib/env";
import type {
  Comment,
  CommentBase,
  CommentWithRelations,
} from "@/lib/schema/comment/comment";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest, { type APIResponse } from "@/service/api-client";
import { useEffect, useState } from "react";
import { MdOutlineInsertComment } from "react-icons/md";
import AnnouncementCard from "../cards/announcement-card";
import CommentCard from "../cards/comment-card";
import MessageInput from "../form/message-input/message-input";
import CommentCardSkeleton from "../skeletons/comment-skeleton";

interface CommentsDialogProps {
  dialogTriggerType?: "icon" | "button";
  name?: string;
  auth: AuthContext;
  announcement?: Announcement;
  lang: Locale;
}

const CommentsDialog = ({
  announcement,
  dialogTriggerType,
  auth,
  lang,
}: CommentsDialogProps) => {
  const [newComment, setNewComment] = useState("");
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [localComments, setLocalComments] = useState<CommentWithRelations[]>(
    [],
  );

  const [commentState, setCommentState] = useState<
    APIResponse<Paginated<CommentWithRelations>>
  >({
    isLoading: false,
    data: undefined,
  });

  useEffect(() => {
    if (!announcement?._id) return;

    const fetchComments = async () => {
      setCommentState((prev) => ({ ...prev, isLoading: true }));
      setPage(1);

      const [comments] = await Promise.all([
        apiRequest<void, Paginated<CommentWithRelations>>(
          "get",
          `/school/comments/others?field=target_post_id&value=${announcement._id}&limit=${LIMIT}&page=1`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        ),
      ]);

      setCommentState(comments);
    };

    fetchComments();
  }, [announcement?._id]);

  const handleLoadMore = async () => {
    if (!commentState.data) return;
    if (isLoadingMore) return;

    const nextPage = page + 1;

    if (nextPage > commentState.data.total_pages) return;

    setIsLoadingMore(true);

    const res = await apiRequest<void, Paginated<CommentWithRelations>>(
      "get",
      `/school/comments/others?field=target_post_id&value=${announcement?._id}&limit=${LIMIT}&page=${nextPage}`,
      undefined,
      { token: auth.token, schoolToken: auth.schoolToken },
    );

    if (res.data) {
      const newData = res.data;
      setCommentState((prev) => {
        if (!prev.data) return prev;

        return {
          ...prev,
          data: {
            ...prev.data,
            current_page: newData.current_page,
            data: [...prev.data.data, ...newData.data],
          },
        };
      });

      setPage(nextPage);
    }

    setIsLoadingMore(false);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await apiRequest<CommentBase, Comment>(
        "post",
        "/school/comments",
        {
          content: newComment,
          author: {
            id: auth.school?.member?._id ?? auth.user.id,
            role:
              auth.school?.member?.user_type === "USER"
                ? "SCHOOLSTAFF"
                : (auth.school?.member?.user_type ??
                  auth.user.role ??
                  "STUDENT"),
          },
          target_post_id: announcement?._id ?? "",
          parent_comment_id: undefined,
        },
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );

      if (!res.data) {
        showToast({
          title: "Error",
          description: res.message,
          type: "error",
        });
        return;
      }

      const newCommentData: CommentWithRelations = {
        ...res.data,
        author_user: auth.school?.member,
      };

      setLocalComments((prev) => [
        newCommentData,
        ...prev.filter((c) => c._id !== newCommentData._id),
      ]);

      setCommentState((prev) => {
        if (!prev.data) return prev;

        return {
          ...prev,
          data: {
            ...prev.data,
            total: prev.data.total + 1,
          },
        };
      });

      setNewComment("");
    } catch (error) {
      showToast({
        title: "Failed to post comment",
        description:
          error instanceof Error ? error.message : "Failed to post comment",
        type: "error",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {dialogTriggerType === "button" && commentState.data?.total !== 0 && (
            <Button
              variant={"ghost"}
              type="button"
              className=" w-fit"
              size={"sm"}
            >
              {commentState.isLoading ? (
                <Skeleton className=" h-6 w-16" />
              ) : (
                <span>{commentState.data?.total} comments</span>
              )}
            </Button>
          )}
          {dialogTriggerType === "icon" && (
            <Button title="comments" library="daisy" variant="ghost" size="md">
              <MdOutlineInsertComment size={22} />
              <span className=" sr-only">
                {commentState.data?.total} comments
              </span>
            </Button>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] h-[95vh] overflow-y-auto overflow-visible sm:max-w-5xl flex flex-row gap-4">
        <div className=" w-1/2">
          <AnnouncementCard
            isCommentOpen
            auth={auth}
            announcement={announcement}
            lang={lang}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between relative">
          <div>
            <DialogHeader>
              <DialogTitle>
                {commentState.data?.total !== 0
                  ? commentState.data?.total
                  : null}{" "}
                Comments
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[63vh] overflow-y-scroll ">
              {commentState.isLoading || commentState.isLoading ? (
                <div className="flex flex-col gap-2">
                  {[...Array(6)].map((_, index) => (
                    <CommentCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {[
                    ...localComments,
                    ...(commentState?.data?.data ?? []).filter(
                      (c) => !localComments.some((lc) => lc._id === c._id),
                    ),
                  ].map((comment, i) => (
                    <CommentCard
                      key={`${i}-${comment._id}`}
                      comment={comment}
                      lang={lang}
                    />
                  ))}
                </div>
              )}
              {commentState?.data?.total &&
                commentState.data.total >
                  (commentState?.data?.data.length ?? 0) && (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore
                      ? "Loading..."
                      : `View others (${
                          commentState.data.total -
                          (commentState.data?.data.length ?? 0)
                        }
                    )`}
                  </Button>
                )}

              <div className="min-h-20" />
            </div>
          </div>
          <MessageInput
            placeholder="Add comment..."
            enabledTools={["emoji", "metion", "toolbar", "send"]}
            value={newComment}
            onChange={(val) => setNewComment(val)}
            onSend={handleCommentSubmit}
            className=" absolute bottom-3 w-full  max-h-50 z-40"
            classname=" min-h-10"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
