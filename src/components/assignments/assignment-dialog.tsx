"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Assignment } from "@/lib/schema/assignment/assignment-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import AssignmentForm from "./assignment-form";

interface Props {
  auth: AuthContext;
  assignment?: Assignment;
  classId?: string;
  subjectId?: string;
}

const AssignmentDialog = ({ auth, assignment, classId, subjectId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={assignment ? undefined : "create"}
          library="daisy"
          variant={assignment ? "outline" : "primary"}
          size="sm"
        >
          {assignment ? "Update Assignment" : "Create Assignment"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {assignment ? `Update ${assignment.title}` : "Create Assignment"}
          </DialogTitle>
        </DialogHeader>

        <AssignmentForm
          auth={auth}
          assignment={assignment}
          classId={classId}
          subjectId={subjectId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;
