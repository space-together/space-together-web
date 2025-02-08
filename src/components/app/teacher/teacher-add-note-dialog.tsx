import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { CgNotes } from "react-icons/cg";
import { IoAddCircleSharp } from "react-icons/io5";

const TeacherCreateNoteDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="md"
          className=" flex justify-between items-center"
        >
          <div className="flex space-x-2 ">
            <CgNotes />
            <span>Physics</span>
          </div>
          <div>
            <IoAddCircleSharp size={24} />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* TODO: make teacher add note form */}
      </DialogContent>
    </Dialog>
  );
};

export default TeacherCreateNoteDialog;
