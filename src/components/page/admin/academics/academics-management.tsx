"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AuthContext } from "@/lib/utils/auth-context";
import AssessmentCategoriesTab from "./tabs/assessment-categories-tab";
import ExamsTab from "./tabs/exams-tab";
import GradingScalesTab from "./tabs/grading-scales-tab";
import ResultsTab from "./tabs/results-tab";

interface AcademicsManagementProps {
  auth: AuthContext;
}

export default function AcademicsManagement({ auth }: AcademicsManagementProps) {
  return (
    <Tabs defaultValue="exams" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="exams">Exams</TabsTrigger>
        <TabsTrigger value="assessments">Assessment Categories</TabsTrigger>
        <TabsTrigger value="grading">Grading Scales</TabsTrigger>
        <TabsTrigger value="results">Results & Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="exams" className="mt-6">
        <ExamsTab auth={auth} />
      </TabsContent>

      <TabsContent value="assessments" className="mt-6">
        <AssessmentCategoriesTab auth={auth} />
      </TabsContent>

      <TabsContent value="grading" className="mt-6">
        <GradingScalesTab auth={auth} />
      </TabsContent>

      <TabsContent value="results" className="mt-6">
        <ResultsTab auth={auth} />
      </TabsContent>
    </Tabs>
  );
}
