import CreateSubjectForm from "@/components/form/create-subject-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPlus } from "react-icons/bs";

interface props {
  classId ?: string;
}

const CreateSubjectDialog = ({classId} : props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BsPlus /> Add new subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add new subject</DialogTitle>
        </DialogHeader>
        <CreateSubjectForm classId={classId}/>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectDialog;
