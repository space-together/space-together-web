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
import { FaReadme } from "react-icons/fa6";

interface ReadDialogProps {
  reads?: any;
  dialogTriggerType?: "icon" | "text";
}

const ReadDialog = ({ reads, dialogTriggerType = "icon" }: ReadDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {dialogTriggerType === "icon" ? (
          <Button title="Read" library="daisy" variant="ghost" size="md">
            <FaReadme size={28} />
            <span className=" ">43 </span>
          </Button>
        ) : (
          <Button library="daisy" variant={"ghost"} size="sm">
            43 Readings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className=" p-0">
        <DialogHeader className=" px-6 py-4">
          <DialogTitle>People Reading</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-scroll px-6">
          {[...Array(32)].map((_, i) => {
            return (
              <UserSmCard
                showMessage
                key={i}
                name="Bruno Rwanda"
                lang="en"
                avatarProps={{ size: "xs" }}
                role="Teacher"
                image={"/images/2.jpg"}
              />
            );
          })}
        </div>
        <DialogFooter className="px-6 pb-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReadDialog;
