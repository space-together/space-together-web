"use client";

import { Button } from "@/components/ui/button";
import { useExams } from "@/lib/hooks/academics/useExams";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Plus } from "lucide-react";
import { useState } from "react";
import ExamDialog from "../dialogs/exam-dialog";
import ExamsTable from "../tables/exams-table";

interface ExamsTabProps {
  auth: AuthContext;
}

export default function ExamsTab({ auth }: ExamsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | undefined>();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { exams, isLoading, mutate } = useExams(
    filters,
    auth.token,
    auth.schoolToken || undefined,
  );

  const handleEdit = (examId: string) => {
    setSelectedExam(examId);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedExam(undefined);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedExam(undefined);
    mutate();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Exams</h2>
          <p className="text-muted-foreground">
            Manage exams and assessment periods
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <ExamsTable
        exams={exams}
        isLoading={isLoading}
        onEdit={handleEdit}
        onRefresh={mutate}
        auth={auth}
      />

      <ExamDialog
        open={isDialogOpen}
        onClose={handleClose}
        examId={selectedExam}
        auth={auth}
      />
    </div>
  );
}
