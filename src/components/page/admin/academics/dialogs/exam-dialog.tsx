"use client";

import ExamForm from "@/components/page/admin/academics/forms/exam-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useExam } from "@/lib/hooks/academics/useExams";
import type { Exam } from "@/lib/schema/academics/exam.schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ExamDialogProps {
  auth: AuthContext;
  exam?: Exam;
  examId?: string;
  onSuccess?: () => void;
}

export default function ExamDialog({
  auth,
  exam: examProp,
  examId,
  onSuccess,
}: ExamDialogProps) {
  const [open, setOpen] = useState(false);
  
  const { exam: fetchedExam, isLoading } = useExam(
    examId,
    auth.token,
    auth.schoolToken || undefined,
  );

  const exam = examProp || fetchedExam || undefined;

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          role={exam ? undefined : "create"}
          library="daisy"
          variant={exam ? "outline" : "primary"}
          size="sm"
        >
          {exam ? "Update Exam" : "Create Exam"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {exam ? `Update ${exam.name}` : "Create Exam"}
          </DialogTitle>
        </DialogHeader>

        {isLoading && examId ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <ExamForm auth={auth} exam={exam} onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
