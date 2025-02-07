"use client";
import CreateClassForm from "@/components/form/create-class-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UseTheme from "@/context/theme/use-theme";
import { Plus } from "lucide-react";
interface props {
  isOpen?: boolean;
  haveClass ?: boolean;
}

const CreateClassDialog = ({ isOpen, haveClass }: props) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button  size={haveClass ? "sm" : "md"} variant={haveClass ? "ghost":"info"}>
          <Plus /> Create Class
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()} className=" sm:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle>Create new Class</DialogTitle>
        </DialogHeader>
        <CreateClassForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
