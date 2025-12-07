import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Class } from "@/lib/schema/class/class-schema";
import type { ClassSubject } from "@/lib/schema/subject/class-subject-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import ClassSubjectForm from "../subjects/class-subject-form";

interface SubjectDialogProps {
  subject?: ClassSubject;
  auth: AuthContext;
  cls?: Class;
}

const SubjectDialog = ({ subject, auth, cls }: SubjectDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"primary"} role="create">
          Add subject
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{subject ? "Edit Subject" : "Add Subject"}</DialogTitle>
          <DialogDescription>
            {subject
              ? "Edit a subject in the class."
              : "Add a new subject to the class."}
          </DialogDescription>
        </DialogHeader>
        <ClassSubjectForm auth={auth} sub={subject} cls={cls} />
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;
