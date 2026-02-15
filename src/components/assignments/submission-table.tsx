"use client";

import GradeDialog from "@/components/assignments/grade-dialog";
import MyAvatar from "@/components/common/image/my-avatar";
import { Badge } from "@/components/ui/badge";
import type { Submission } from "@/lib/schema/assignment/assignment-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatDistanceToNow } from "date-fns";

interface Props {
  auth: AuthContext;
  assignmentId: string;
  submissions: (Submission & {
    student?: { name: string; email: string; image?: string; gender?: string };
  })[];
  maxScore: number;
}

const SubmissionTable = ({ auth, assignmentId, submissions, maxScore }: Props) => {
  const getStatusBadge = (submission: Submission) => {
    if (submission.status === "Graded") {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">
          Graded
        </Badge>
      );
    }
    if (submission.is_late) {
      return (
        <Badge variant="destructive">
          Late
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
        Submitted
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Submitted</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Score</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No submissions yet
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission.id || submission._id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <MyAvatar
                        src={submission.student?.image}
                        alt={submission.student?.name}
                        size="sm"
                        role={{
                          role: "STUDENT",
                          gender: submission.student?.gender as any,
                        }}
                      />
                      <div>
                        <div className="font-medium">{submission.student?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {submission.student?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(submission)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {submission.submitted_at
                      ? formatDistanceToNow(new Date(submission.submitted_at), {
                          addSuffix: true,
                        })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {submission.score !== undefined ? (
                      <span className="font-medium">
                        {submission.score} / {maxScore}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Not graded</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <GradeDialog
                      auth={auth}
                      assignmentId={assignmentId}
                      submission={submission}
                      maxScore={maxScore}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTable;
