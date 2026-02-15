"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAtRiskStudents } from "@/lib/hooks/academics/useAnalytics";
import type { AuthContext } from "@/lib/utils/auth-context";
import { AlertTriangle } from "lucide-react";

interface AtRiskStudentsWidgetProps {
  classId: string;
  auth: AuthContext;
}

export default function AtRiskStudentsWidget({
  classId,
  auth,
}: AtRiskStudentsWidgetProps) {
  const { atRiskStudents, isLoading } = useAtRiskStudents(
    classId,
    auth.token,
    auth.schoolToken || undefined,
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading at-risk students...</div>;
  }

  if (atRiskStudents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            At-Risk Students
          </CardTitle>
          <CardDescription>Students who need additional support</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Great news!</AlertTitle>
            <AlertDescription>
              No students are currently at risk. Keep up the good work!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          At-Risk Students
        </CardTitle>
        <CardDescription>
          {atRiskStudents.length} students need additional support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {atRiskStudents.map((student) => (
            <div
              key={student.student_id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {student.student_name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{student.student_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {student.subjects_failing} subjects failing
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="destructive">
                  GPA: {student.gpa.toFixed(2)}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">
                  {student.average_percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
