"use client";
import AddPersonInClass from "@/components/form/add-person-in-class-form";
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
  person?: "TEACHER" | "STUDENT";
  classId: string;
}

const AddMemberInClassDialog = ({ person, classId }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"info"}>
          <Plus /> Add {person ? person === "TEACHER" ? "teacher" : "student" : "New member"}
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()} className=" sm:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle>
            Add new {person ? person === "TEACHER" ? "teachers" : "students" : "members"}
          </DialogTitle>
        </DialogHeader>
        <AddPersonInClass person={person} classId={classId} />
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberInClassDialog;
