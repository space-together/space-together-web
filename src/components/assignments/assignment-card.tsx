"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Assignment } from "@/lib/schema/assignment/assignment-schema";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Props {
  assignment: Assignment & {
    teacher?: { name: string };
    subject?: { name: string };
    class?: { name: string };
    submission_count?: number;
    total_students?: number;
  };
  role: "teacher" | "student" | "staff";
  lang: string;
}

const AssignmentCard = ({ assignment, role, lang }: Props) => {
  const dueDate = new Date(assignment.due_date);
  const isPastDue = dueDate < new Date();
  const timeUntilDue = formatDistanceToNow(dueDate, { addSuffix: true });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200";
      case "Archived":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
    }
  };

  const getHref = () => {
    if (role === "teacher") {
      return `/${lang}/t/assignments/${assignment.id || assignment._id}`;
    }
    if (role === "student") {
      return `/${lang}/s/assignments/${assignment.id || assignment._id}`;
    }
    return `/${lang}/s-t/assignments/${assignment.id || assignment._id}`;
  };

  return (
    <Link href={getHref()}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{assignment.title}</CardTitle>
            <Badge className={getStatusColor(assignment.status)}>
              {assignment.status}
            </Badge>
          </div>
          {assignment.subject && (
            <p className="text-sm text-muted-foreground">
              {assignment.subject.name}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {assignment.description && (
            <p className="text-sm line-clamp-2">{assignment.description}</p>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <span className={isPastDue ? "text-red-500" : "text-muted-foreground"}>
              Due {timeUntilDue}
            </span>
            {isPastDue && (
              <Badge variant="destructive" className="text-xs">
                Overdue
              </Badge>
            )}
          </div>

          {role === "teacher" && assignment.submission_count !== undefined && (
            <div className="text-sm text-muted-foreground">
              {assignment.submission_count} / {assignment.total_students} submissions
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Max Score: {assignment.max_score}</span>
            {assignment.allow_late_submission && (
              <Badge variant="outline" className="text-xs">
                Late allowed
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AssignmentCard;
