"use client";
import AddStudentInClass from "@/components/form/add-person-in-class-form";
import AddTeacherInClassForm from "@/components/form/add-teacher-in-class-form";
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
import { Subject } from "../../../../../prisma/prisma/generated";

interface props {
  person?: "TEACHER" | "STUDENT";
  classId: string;
  classSubjects?: Subject[] | null;
}

const AddMemberInClassDialog = ({ person, classId, classSubjects }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={!person ? "info" : "outline"}>
          <Plus /> Add{" "}
          {person
            ? person === "TEACHER"
              ? "teacher"
              : "students"
            : "New member"}
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()} className=" sm:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle>
            Add new{" "}
            {person
              ? person === "TEACHER"
                ? "teacher"
                : "students"
              : "members"}
          </DialogTitle>
        </DialogHeader>
        {person === "TEACHER" ? (
          <AddTeacherInClassForm
            classSubjects={classSubjects}
            classId={classId}
          />
        ) : (
          <AddStudentInClass classId={classId} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberInClassDialog;
