"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AttendanceSummary } from "@/lib/schema/parent/parent-schema";

interface ParentAttendanceSummaryProps {
  attendance: AttendanceSummary;
}

export default function ParentAttendanceSummary({
  attendance,
}: ParentAttendanceSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Attendance Rate</span>
            <span className="font-medium">
              {attendance.attendance_percentage}%
            </span>
          </div>
          <Progress value={attendance.attendance_percentage} />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold text-green-600">
              {attendance.present_count}
            </div>
            <div className="text-sm text-muted-foreground">Present</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold text-red-600">
              {attendance.absent_count}
            </div>
            <div className="text-sm text-muted-foreground">Absent</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold text-yellow-600">
              {attendance.late_count}
            </div>
            <div className="text-sm text-muted-foreground">Late</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold text-blue-600">
              {attendance.excused_count}
            </div>
            <div className="text-sm text-muted-foreground">Excused</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
