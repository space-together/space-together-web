"use client";


import MyAvatar from "@/components/common/image/my-avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTopStudents } from "@/lib/hooks/academics/useAnalytics";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Award } from "lucide-react";

interface TopStudentsWidgetProps {
  classId: string;
  limit?: number;
  auth: AuthContext;
}

export default function TopStudentsWidget({
  classId,
  limit = 10,
  auth,
}: TopStudentsWidgetProps) {
  const { topStudents, isLoading } = useTopStudents(
    classId,
    limit,
    auth.token,
    auth.schoolToken || undefined,
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading top students...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Top {limit} Students
        </CardTitle>
        <CardDescription>Highest performing students in the class</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStudents.map((student, index) => (
            <div
              key={student.student_id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <MyAvatar alt={student.student_name}/>
               
                <div>
                  <div className="font-medium">{student.student_name}</div>
                  <div className="text-sm text-muted-foreground">
                    Rank #{student.rank}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{student.gpa.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
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
