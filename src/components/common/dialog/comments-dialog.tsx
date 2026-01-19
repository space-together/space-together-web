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
import type { CountDoc, Paginated } from "@/lib/schema/common-schema";
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

  const [commentState, setCommentState] = useState<
    APIResponse<Paginated<CommentWithRelations>>
  >({
    isLoading: false,
    data: undefined,
  });

  const [totalComments, setTotalComments] = useState<APIResponse<CountDoc>>({
    isLoading: false,
    data: undefined,
  });

  useEffect(() => {
    const fetchComments = async () => {
      setCommentState((prev) => ({ ...prev, isLoading: true }));

      const [comments, total] = await Promise.all([
        apiRequest<void, Paginated<CommentWithRelations>>(
          "get",
          `/school/comments/others?field=target_post_id&value=${announcement?._id}&limit=${LIMIT}`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        ),
        apiRequest<void, CountDoc>(
          "get",
          `/school/comments/count?field=target_post_id&value=${announcement?._id}`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        ),
      ]);

      setCommentState(comments);
      setTotalComments(total);
    };

    fetchComments();
  }, [announcement]);

  // In CommentsDialog component

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
        return showToast({
          title: "Error",
          description: res.message,
          type: "error",
        });
      }

      const newCommentData: CommentWithRelations = {
        ...res.data,
        author_user: auth?.school?.member ?? undefined,
      };

      setCommentState((prev) => {
        if (!prev.data) {
          return {
            ...prev,
            data: {
              data: [newCommentData],
              total: 1,
              total_pages: 1,
              current_page: 1,
            },
          };
        }

        // Only prepend if user is on first page
        if (prev.data.current_page !== 1) {
          return {
            ...prev,
            data: {
              ...prev.data,
              total: prev.data.total + 1,
            },
          };
        }

        return {
          ...prev,
          data: {
            ...prev.data,
            data: [newCommentData, ...prev.data.data],
            total: prev.data.total + 1,
          },
        };
      });

      setTotalComments((prev) => ({
        ...prev,
        data: {
          count: (prev.data?.count ?? 0) + 1,
        },
      }));

      setNewComment("");
    } catch (error) {
      showToast({
        title: "Error",
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
          {dialogTriggerType === "button" &&
            totalComments.data?.count !== 0 && (
              <Button
                variant={"ghost"}
                type="button"
                className=" w-fit"
                size={"sm"}
              >
                {totalComments.isLoading ? (
                  <Skeleton className=" h-6 w-10" />
                ) : (
                  <span>{totalComments.data?.count} comments</span>
                )}
              </Button>
            )}
          {dialogTriggerType === "icon" && (
            <Button title="comments" library="daisy" variant="ghost" size="md">
              <MdOutlineInsertComment size={22} />
              <span className=" sr-only">
                {totalComments.data?.count} comments
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
              <DialogTitle>12 Comments</DialogTitle>
            </DialogHeader>
            <div className="max-h-[63vh] overflow-y-scroll ">
              {commentState.isLoading ? (
                <div className="flex flex-col gap-2">
                  {[...Array(3)].map((_, index) => (
                    <CommentCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {commentState?.data?.data.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      comment={comment}
                      lang={lang}
                    />
                  ))}
                </div>
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
