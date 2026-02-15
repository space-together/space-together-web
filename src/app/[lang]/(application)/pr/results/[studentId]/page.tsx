import AppPageHeader from "@/components/page/common/app-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Student Results",
    description: "View student academic results",
  };
};

export default async function ResultsPage(
  props: PageProps<"/[lang]/pr/results/[studentId]">,
) {
  const params = await props.params;
  const { lang, studentId } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const results = await parentService.getStudentResults(studentId, {
    token: auth.token,
    schoolToken: auth.schoolToken,
  });

  if (!results) {
    return (
      <div className="container mx-auto p-6">
        <AppPageHeader
          title="Results"
          description="Student academic results"
        />
        <div className="mt-6">
          <p className="text-muted-foreground">
            Unable to load results data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AppPageHeader
        title={`Results - ${results.student_name}`}
        description="View academic performance and grades"
      />

      <div className="mt-6 space-y-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Subject Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.subjects.map((subject) => (
                  <TableRow key={subject.subject_id}>
                    <TableCell className="font-medium">
                      {subject.subject_name}
                    </TableCell>
                    <TableCell>{subject.marks}</TableCell>
                    <TableCell>
                      <span className="badge badge-primary badge-sm">
                        {subject.grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {subject.remarks || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {results.teacher_remarks && (
          <Card>
            <CardHeader>
              <CardTitle>Teacher Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{results.teacher_remarks}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
