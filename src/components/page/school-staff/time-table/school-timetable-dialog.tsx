"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SchoolTimetable } from "@/lib/schema/school/school-timetable-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import SchoolTimetableForm from "./school-timetable-form";

interface SchoolTimetableDialogProps {
  timetable?: SchoolTimetable;
  auth: AuthContext;
}

const SchoolTimetableDialog = ({
  auth,
  timetable,
}: SchoolTimetableDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={timetable ? undefined : "create"}
          library="daisy"
          variant={timetable ? "outline" : "primary"}
          size={"sm"}
        >
          {timetable ? "Update timetable" : "Create timetable"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {timetable ? `Update school timetable` : "Create school timetable"}
          </DialogTitle>
        </DialogHeader>
        <SchoolTimetableForm auth={auth} timetable={timetable} />
      </DialogContent>
    </Dialog>
  );
};

export default SchoolTimetableDialog;
