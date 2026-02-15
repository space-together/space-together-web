import AssignmentDialog from "@/components/assignments/assignment-dialog";
import SubmissionTable from "@/components/assignments/submission-table";
import NotFoundPage from "@/components/page/not-found";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Assignment, Submission } from "@/lib/schema/assignment/assignment-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { formatDistanceToNow } from "date-fns";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Assignment Details",
    description: "View assignment details and submissions",
  };
};

const TeacherAssignmentDetailPage = async (
  props: PageProps<"/[lang]/t/assignments/[assignmentId]">
) => {
  const params = await props.params;
  const { lang, assignmentId } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return <NotFoundPage message="You need to have school to view this page" />;
  }

  const [assignment_res, submissions_res] = await Promise.all([
    apiRequest<void, Assignment>(
      "get",
      `/assignments/${assignmentId}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      }
    ),
    apiRequest<void, { data: Submission[] }>(
      "get",
      `/assignments/${assignmentId}/submissions`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "submission",
      }
    ),
  ]);

  if (!assignment_res.data) {
    return <NotFoundPage message="Assignment not found" />;
  }

  const assignment = assignment_res.data;
  const submissions = submissions_res?.data?.data ?? [];
  const dueDate = new Date(assignment.due_date);
  const isPastDue = dueDate < new Date();

  return (
    <RealtimeProvider<Submission>
      channels={[
        {
          name: "submission",
          initialData: submissions,
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="space-y-6">
        {/* Assignment Details */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      assignment.status === "Published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200"
                    }
                  >
                    {assignment.status}
                  </Badge>
                  {isPastDue && (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                </div>
              </div>
              <AssignmentDialog auth={auth} assignment={assignment} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignment.description && (
              <div>
                <h3 className="font-semibold mb-1">Description</h3>
                <p className="text-muted-foreground">{assignment.description}</p>
              </div>
            )}

            {assignment.instructions && (
              <div>
                <h3 className="font-semibold mb-1">Instructions</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {assignment.instructions}
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">
                  {formatDistanceToNow(dueDate, { addSuffix: true })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Score</p>
                <p className="font-medium">{assignment.max_score}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submissions</p>
                <p className="font-medium">
                  {(assignment as any).submission_count || submissions.length} /{" "}
                  {(assignment as any).total_students || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late Submissions</p>
                <p className="font-medium">
                  {assignment.allow_late_submission ? "Allowed" : "Not Allowed"}
                </p>
              </div>
            </div>

            {assignment.attachment_url && (
              <div>
                <h3 className="font-semibold mb-1">Attachment</h3>
                <a
                  href={assignment.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Download Attachment
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <SubmissionTable
              auth={auth}
              assignmentId={assignmentId}
              submissions={submissions}
              maxScore={assignment.max_score}
            />
          </CardContent>
        </Card>
      </div>
    </RealtimeProvider>
  );
};

export default TeacherAssignmentDetailPage;
