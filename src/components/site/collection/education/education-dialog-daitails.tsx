import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EducationDialogDetails = () => {
  return (
    <Dialog open>
      <DialogTrigger asChild>
        <Button variant={"info"} className=" w-full">
          View education
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Education Name</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
            
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EducationDialogDetails;
