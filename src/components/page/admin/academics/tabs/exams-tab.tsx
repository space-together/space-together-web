"use client";

import ExamDialog from "@/components/page/admin/academics/dialogs/exam-dialog";
import ExamsTable from "@/components/page/admin/academics/tables/exams-table";
import { useExams } from "@/lib/hooks/academics/useExams";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useState } from "react";

interface ExamsTabProps {
  auth: AuthContext;
}

export default function ExamsTab({ auth }: ExamsTabProps) {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { exams, isLoading, mutate } = useExams(
    filters,
    auth.token,
    auth.schoolToken || undefined,
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Exams</h2>
          <p className="text-muted-foreground">
            Manage exams and assessment periods
          </p>
        </div>
        <ExamDialog auth={auth} onSuccess={mutate} />
      </div>

      <ExamsTable
        exams={exams}
        isLoading={isLoading}
        onRefresh={mutate}
        auth={auth} onEdit={function (examId: string): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
}
