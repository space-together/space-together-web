"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ReportCard } from "@/lib/schema/academics/report-card.schema";
import { format } from "date-fns";
import { Download, Printer } from "lucide-react";

interface ReportCardViewerProps {
  report: ReportCard;
}

export default function ReportCardViewer({ report }: ReportCardViewerProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header Actions - Hidden in print */}
      <div className="flex justify-end gap-2 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Report Card */}
      <Card className="print:shadow-none print:border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="School Logo"
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-2xl">Academic Report Card</CardTitle>
          <div className="text-sm text-muted-foreground">
            Generated on {format(new Date(report.generated_at), "MMMM dd, yyyy")}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Student Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium">{report.student_info.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Registration Number</div>
                <div className="font-medium">{report.student_info.registration_number}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Class</div>
                <div className="font-medium">{report.student_info.class_name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Term</div>
                <div className="font-medium">{report.term_id}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Academic Performance */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Academic Performance</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold">{report.academic_performance.gpa.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">GPA</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold">{report.academic_performance.average_percentage.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Average</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold">#{report.academic_performance.rank_in_class}</div>
                <div className="text-sm text-muted-foreground">Rank</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold">{report.academic_performance.grade}</div>
                <div className="text-sm text-muted-foreground">Grade</div>
              </div>
            </div>

            {/* Subject Results */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3">Subject</th>
                    <th className="text-center p-3">Score</th>
                    <th className="text-center p-3">Percentage</th>
                    <th className="text-center p-3">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {report.academic_performance.subject_results.map((subject) => (
                    <tr key={subject.class_subject_id} className="border-t">
                      <td className="p-3 font-medium">{subject.subject_name}</td>
                      <td className="text-center p-3">{subject.weighted_score.toFixed(1)}</td>
                      <td className="text-center p-3">{subject.percentage.toFixed(1)}%</td>
                      <td className="text-center p-3">
                        <Badge>{subject.grade}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator />

          {/* Attendance */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Attendance Summary</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Days</div>
                <div className="text-xl font-bold">{report.attendance_summary.total_days}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Days Present</div>
                <div className="text-xl font-bold text-green-600">{report.attendance_summary.days_present}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Days Absent</div>
                <div className="text-xl font-bold text-red-600">{report.attendance_summary.days_absent}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Attendance %</div>
                <div className="text-xl font-bold">{report.attendance_summary.attendance_percentage.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Teacher Remarks */}
          {report.teacher_remarks.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Teacher Remarks</h3>
              <div className="space-y-3">
                {report.teacher_remarks.map((remark) => (
                  <div key={remark.class_subject_id} className="border-l-4 border-primary pl-4">
                    <div className="font-medium">{remark.subject_name}</div>
                    <div className="text-sm text-muted-foreground">{remark.teacher_name}</div>
                    <p className="mt-1 text-sm">{remark.remark}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Class Teacher Comment */}
          {report.class_teacher_comment && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Class Teacher Comment</h3>
                <p className="text-sm">{report.class_teacher_comment}</p>
              </div>
            </>
          )}

          {/* Principal Comment */}
          {report.principal_comment && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Principal Comment</h3>
                <p className="text-sm">{report.principal_comment}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
