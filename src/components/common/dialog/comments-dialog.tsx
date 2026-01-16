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
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useState } from "react";
import { MdOutlineInsertComment } from "react-icons/md";
import AnnouncementCard from "../cards/announcement-card";
import CommentCard from "../cards/comment-card";
import MessageInput from "../form/message-input/message-input";

interface CommentsDialogProps {
  comments?: any;
  dialogTriggerType?: "icon" | "button";
  name?: string;
  auth: AuthContext;
  announcement?: Announcement;
  lang: Locale;
  // post ?:
}

const CommentsDialog = ({
  comments,
  announcement,
  dialogTriggerType,
  auth,
  lang,
}: CommentsDialogProps) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    if (!newComment) return;
    try {
      const res = await apiRequest("post");
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {dialogTriggerType === "button" ? (
          <Button
            variant={"ghost"}
            type="button"
            className=" w-fit"
            size={"sm"}
          >
            14 View all comments
          </Button>
        ) : (
          <Button title="comments" library="daisy" variant="ghost" size="md">
            <MdOutlineInsertComment size={22} />
            <span className=" sr-only">32 Likes</span>
          </Button>
        )}
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
        <div className="w-1/2">
          <DialogHeader>
            <DialogTitle>12 Comments</DialogTitle>
          </DialogHeader>
          <div className="max-h-[63vh] overflow-y-scroll ">
            {[...Array(8)].map((_, i) => {
              return <CommentCard key={i} />;
            })}
          </div>
          <MessageInput
            placeholder="Add comment..."
            enabledTools={["emoji", "metion", "toolbar", "send"]}
            onChange={(val) => setNewComment(val)}
            onSend={handleCommentSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
