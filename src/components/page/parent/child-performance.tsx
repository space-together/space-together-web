"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudentReports } from "@/lib/hooks/academics/useReports";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Award, BookOpen, Calendar, TrendingUp } from "lucide-react";

interface ChildPerformanceProps {
  studentId: string;
  auth: AuthContext;
}

export default function ChildPerformance({ studentId, auth }: ChildPerformanceProps) {
  const { reports, isLoading } = useStudentReports(
    studentId,
    auth.token,
    auth.schoolToken || undefined,
  );

  const latestReport = reports?.[0];

  if (isLoading) {
    return <div className="text-center py-8">Loading performance data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Child Performance</h1>
        <p className="text-muted-foreground">
          Monitor your child's academic progress
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport?.academic_performance.gpa.toFixed(2) || "N/A"}
            </div>
            <Badge className="mt-2">
              Grade: {latestReport?.academic_performance.grade}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              #{latestReport?.academic_performance.rank_in_class || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {latestReport?.academic_performance.total_students}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport?.attendance_summary.attendance_percentage.toFixed(1)}%
            </div>
            <Progress
              value={latestReport?.attendance_summary.attendance_percentage}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport?.academic_performance.subject_results.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total subjects
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="remarks">Teacher Remarks</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
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
                    <div className="text-sm text-muted-foreground">
                      Weighted Score: {subject.weighted_score.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remarks">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Remarks</CardTitle>
              <CardDescription>Feedback from subject teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {latestReport?.teacher_remarks.map((remark) => (
                  <div key={remark.class_subject_id} className="border-l-4 border-primary pl-4">
                    <div className="font-medium">{remark.subject_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {remark.teacher_name}
                    </div>
                    <p className="mt-2">{remark.remark}</p>
                  </div>
                ))}

                {latestReport?.class_teacher_comment && (
                  <div className="border-l-4 border-green-500 pl-4 mt-6">
                    <div className="font-medium">Class Teacher Comment</div>
                    <p className="mt-2">{latestReport.class_teacher_comment}</p>
                  </div>
                )}

                {latestReport?.principal_comment && (
                  <div className="border-l-4 border-blue-500 pl-4 mt-6">
                    <div className="font-medium">Principal Comment</div>
                    <p className="mt-2">{latestReport.principal_comment}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Attendance record for the term</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Days</div>
                    <div className="text-2xl font-bold">
                      {latestReport?.attendance_summary.total_days}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Days Present</div>
                    <div className="text-2xl font-bold text-green-600">
                      {latestReport?.attendance_summary.days_present}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Days Absent</div>
                    <div className="text-2xl font-bold text-red-600">
                      {latestReport?.attendance_summary.days_absent}
                    </div>
                  </div>
                </div>
                <Progress
                  value={latestReport?.attendance_summary.attendance_percentage}
                  className="h-4"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
