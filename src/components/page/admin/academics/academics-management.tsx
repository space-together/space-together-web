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
    <Tabs defaultValue="exams" className="w-full" library="daisy">
      <TabsList variant="bordered" className="mb-6">
        <TabsTrigger value="exams" library="daisy">
          Exams
        </TabsTrigger>
        <TabsTrigger value="assessments" library="daisy">
          Assessment Categories
        </TabsTrigger>
        <TabsTrigger value="grading" library="daisy">
          Grading Scales
        </TabsTrigger>
        <TabsTrigger value="results" library="daisy">
          Results & Reports
        </TabsTrigger>
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
