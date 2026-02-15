"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudentResults } from "@/lib/schema/parent/parent-schema";

interface ParentResultsSummaryProps {
  results: StudentResults;
}

export default function ParentResultsSummary({
  results,
}: ParentResultsSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {results.gpa !== null && results.gpa !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle>GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.gpa.toFixed(2)}</div>
          </CardContent>
        </Card>
      )}
      {results.rank !== null && results.rank !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle>Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {results.rank} / {results.total_students}
            </div>
          </CardContent>
        </Card>
      )}
      {results.exam_name && (
        <Card>
          <CardHeader>
            <CardTitle>Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{results.exam_name}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
