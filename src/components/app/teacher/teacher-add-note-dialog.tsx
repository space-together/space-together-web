"use client"
import CreateNoteForm from "@/components/form/create-note-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UseTheme from "@/context/theme/use-theme";
 import { CgNotes } from "react-icons/cg";
import { IoAddCircleSharp } from "react-icons/io5";

interface props {
  subjectId : string,
}

const TeacherCreateNoteDialog = ({subjectId} : props) => {
  const theme = UseTheme();
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
      <DialogContent data-theme={theme} className=" bg-base-100">
      <DialogHeader className=" happy-title-base">Create add new notes</DialogHeader>
        <CreateNoteForm subjectId={subjectId}/>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherCreateNoteDialog;
