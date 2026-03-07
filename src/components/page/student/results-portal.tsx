"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStudentReports } from "@/lib/hooks/academics/useReports";
import { useStudentTranscript } from "@/lib/hooks/academics/useTranscripts";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Award, Download, FileText, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ResultsPortalProps {
  studentId: string;
  auth: AuthContext;
}

export default function ResultsPortal({ studentId, auth }: ResultsPortalProps) {
  const { reports, isLoading: reportsLoading } = useStudentReports(
    studentId,
    auth.token,
    auth.schoolToken || undefined,
  );

  const { transcript, isLoading: transcriptLoading } = useStudentTranscript(
    studentId,
    auth.token,
    auth.schoolToken || undefined,
  );

  // Mock data for progress chart
  const progressData = [
    { term: "Term 1", gpa: 3.2 },
    { term: "Term 2", gpa: 3.5 },
    { term: "Term 3", gpa: 3.7 },
  ];

  const latestReport = reports?.[0];

  if (reportsLoading || transcriptLoading) {
    return <div className="text-center py-8">Loading results...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Results</h1>
        <p className="text-muted-foreground">
          View your academic performance and progress
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport?.academic_performance.gpa.toFixed(2) || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 4.0
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport?.academic_performance.rank_in_class || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {latestReport?.academic_performance.total_students || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport?.attendance_summary.attendance_percentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {latestReport?.attendance_summary.days_present} / {latestReport?.attendance_summary.total_days} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport?.academic_performance.average_percentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>GPA Progress</CardTitle>
          <CardDescription>Your GPA trend across terms</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="gpa"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Subject Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
          <CardDescription>Detailed breakdown by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latestReport?.academic_performance.subject_results.map((subject) => (
              <div key={subject.class_subject_id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{subject.subject_name}</span>
                    <Badge>{subject.grade}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {subject.percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={subject.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Report Card
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          View Transcript
        </Button>
      </div>
    </div>
  );
}
