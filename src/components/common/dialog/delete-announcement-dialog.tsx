import type { Announcement } from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
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
import type { AuthContext } from "@/lib/utils/auth-context";

interface DeleteAnnouncementDialogProps {
  announcement: Announcement;
  auth: AuthContext;
}

const DeleteAnnouncementDialog = ({
  announcement,
  auth,
}: DeleteAnnouncementDialogProps) => {
  const handleDelete = async () => {};
  return (
    <Dialog>
      <DialogTrigger>
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
            Are you sure you want to delete this announcement?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant={"outline"} library="daisy">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button type="button" variant={"error"} library="daisy">
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAnnouncementDialog;
