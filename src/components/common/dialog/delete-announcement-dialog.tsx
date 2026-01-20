"use client"
import type { Announcement } from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import MessageDisplay from "@/components/common/form/message-input/message-display";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useState, useTransition } from "react";

interface DeleteAnnouncementDialogProps {
  announcement: Announcement;
  auth: AuthContext;
}

const DeleteAnnouncementDialog = ({
  announcement,
  auth,
}: DeleteAnnouncementDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const { deleteItem } = useRealtimeData<Announcement>("announcement");

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await apiRequest<void, Announcement>(
          "delete",
          `/school/announcements/${announcement._id}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (response.error) {
          showToast({
            title: "Failed to delete announcement",
            description: response.message,
            type: "error",
          });
          return;
        }

        deleteItem(announcement._id);
        showToast({
          title: "Announcement deleted",
          description: "The announcement has been successfully deleted.",
          type: "success",
        });

        setOpen(false);
      } catch {
        showToast({
          title: "Failed to delete announcement",
          description: "An unexpected error occurred",
          type: "error",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          type="button"
          variant={"ghost"}
          className=" hover:text-error justify-start flex w-full"
          library="daisy"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this announcement? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 p-4 bg-muted rounded-md">
          <MessageDisplay
            className="text-sm line-clamp-3"
            content={announcement.content}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              library="daisy"
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={"error"}
            library="daisy"
            onClick={handleDelete}
            disabled={isPending}
            role={isPending ? "loading" : undefined}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAnnouncementDialog;
