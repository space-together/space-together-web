"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPlus } from "react-icons/bs";

import CreateEducationForm from "@/components/form/create-education-form";

const CreateEducationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Add new education
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add New Education</DialogTitle>
        </DialogHeader>
        <CreateEducationForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEducationDialog;
