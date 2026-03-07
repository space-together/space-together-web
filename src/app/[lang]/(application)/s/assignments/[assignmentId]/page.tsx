import StudentSubmissionForm from "@/components/assignments/student-submission-form";
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
    description: "View assignment details and submit your work",
  };
};

const StudentAssignmentDetailPage = async (
  props: PageProps<"/[lang]/s/assignments/[assignmentId]">
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

  const [assignment_res, submission_res] = await Promise.all([
    apiRequest<void, Assignment>(
      "get",
      `/assignments/${assignmentId}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      }
    ),
    apiRequest<void, Submission>(
      "get",
      `/submissions/${assignmentId}`,
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
  const submission = submission_res?.data;
  const dueDate = new Date(assignment.due_date);
  const isPastDue = dueDate < new Date();
  const isGraded = submission?.status === "Graded";

  return (
    <RealtimeProvider<Submission>
      channels={[
        {
          name: "submission",
          initialData: submission ? [submission] : [],
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
                  {isPastDue && !submission && (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                  {submission && (
                    <Badge
                      className={
                        isGraded
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200"
                      }
                    >
                      {isGraded ? "Graded" : "Submitted"}
                    </Badge>
                  )}
                  {submission?.is_late && (
                    <Badge variant="destructive">Late</Badge>
                  )}
                </div>
              </div>
              {!isGraded && (
                <StudentSubmissionForm
                  auth={auth}
                  assignmentId={assignmentId}
                  submission={submission}
                  dueDate={assignment.due_date}
                  isGraded={isGraded}
                />
              )}
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

            <div className="grid gap-4 md:grid-cols-3">
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

        {/* Submission Status */}
        {submission && (
          <Card>
            <CardHeader>
              <CardTitle>Your Submission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {submission.file_url && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted File</p>
                  <a
                    href={submission.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download Your Submission
                  </a>
                </div>
              )}

              {submission.comment && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Comment</p>
                  <p>{submission.comment}</p>
                </div>
              )}

              {submission.submitted_at && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                  <p>
                    {formatDistanceToNow(new Date(submission.submitted_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              )}

              {isGraded && (
                <>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg mb-2">Grade</h3>
                    <p className="text-3xl font-bold">
                      {submission.score} / {assignment.max_score}
                    </p>
                  </div>

                  {submission.feedback && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Teacher Feedback
                      </p>
                      <p className="whitespace-pre-wrap">{submission.feedback}</p>
                    </div>
                  )}

                  {submission.feedback_file_url && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Feedback File
                      </p>
                      <a
                        href={submission.feedback_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download Feedback
                      </a>
                    </div>
                  )}

                  {submission.graded_at && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Graded</p>
                      <p>
                        {formatDistanceToNow(new Date(submission.graded_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </RealtimeProvider>
  );
};

export default StudentAssignmentDetailPage;
