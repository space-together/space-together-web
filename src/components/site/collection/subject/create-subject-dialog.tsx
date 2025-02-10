"use client";
import CreateSubjectForm from "@/components/form/create-subject-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UseTheme from "@/context/theme/use-theme";
import { BsPlus } from "react-icons/bs";

interface props {
  classId : string;
}

const CreateSubjectDialog = ({classId} : props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Add new subject
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()}>
        <DialogHeader>
          <DialogTitle>Add new subject</DialogTitle>
        </DialogHeader>
        <CreateSubjectForm classId={classId}/>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectDialog;
