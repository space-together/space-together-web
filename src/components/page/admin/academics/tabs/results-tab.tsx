"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuthContext } from "@/lib/utils/auth-context";
import { rankingService } from "@/service/academics/ranking.service";
import { reportService } from "@/service/academics/report.service";
import { resultService } from "@/service/academics/result.service";
import { Calculator, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ResultsTabProps {
  auth: AuthContext;
}

export default function ResultsTab({ auth }: ResultsTabProps) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string>("");

  const handleCalculateResults = async () => {
    if (!selectedExamId) {
      toast.error("Please select an exam");
      return;
    }

    setIsCalculating(true);
    try {
      await resultService.calculateResults(
        selectedExamId,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Results calculated successfully");
    } catch (error) {
      toast.error("Failed to calculate results");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCalculateRankings = async () => {
    if (!selectedExamId) {
      toast.error("Please select an exam");
      return;
    }

    try {
      await rankingService.calculateRankings(
        selectedExamId,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Rankings calculated successfully");
    } catch (error) {
      toast.error("Failed to calculate rankings");
    }
  };

  const handleBulkGenerateReports = async () => {
    if (!selectedExamId) {
      toast.error("Please select an exam");
      return;
    }

    try {
      await reportService.bulkGenerateReports(
        selectedExamId,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Reports generated successfully");
    } catch (error) {
      toast.error("Failed to generate reports");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Results & Reports</h2>
        <p className="text-muted-foreground">
          Calculate results, rankings, and generate reports
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculate Results
            </CardTitle>
            <CardDescription>
              Calculate GPA and term results for all students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={handleCalculateResults}
              disabled={isCalculating}
            >
              {isCalculating ? "Calculating..." : "Calculate Results"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Calculate Rankings
            </CardTitle>
            <CardDescription>
              Generate class rankings based on GPA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleCalculateRankings}>
              Calculate Rankings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Reports
            </CardTitle>
            <CardDescription>
              Bulk generate report cards for all students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleBulkGenerateReports}>
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
