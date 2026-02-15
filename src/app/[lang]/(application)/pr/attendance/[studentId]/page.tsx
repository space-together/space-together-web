import AppPageHeader from "@/components/page/common/app-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { authContext } from "@/lib/utils/auth-context";
import { parentService } from "@/service/parent/parent.service";
import { format } from "date-fns";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Student Attendance",
    description: "View student attendance records",
  };
};

export default async function AttendancePage(
  props: PageProps<"/[lang]/pr/attendance/[studentId]">,
) {
  const params = await props.params;
  const { lang, studentId } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const attendance = await parentService.getAttendanceSummary(studentId, {
    token: auth.token,
    schoolToken: auth.schoolToken,
  });

  if (!attendance) {
    return (
      <div className="container mx-auto p-6">
        <AppPageHeader
          title="Attendance"
          description="Student attendance information"
        />
        <div className="mt-6">
          <p className="text-muted-foreground">
            Unable to load attendance data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AppPageHeader
        title={`Attendance - ${attendance.student_name}`}
        description="View attendance records and statistics"
      />

      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.recent_records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`badge badge-sm ${
                          record.status === "PRESENT"
                            ? "badge-success"
                            : record.status === "ABSENT"
                              ? "badge-error"
                              : record.status === "LATE"
                                ? "badge-warning"
                                : "badge-info"
                        }`}
                      >
                        {record.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.remarks || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
