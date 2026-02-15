"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Exam } from "@/lib/schema/academics/exam.schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { examService } from "@/service/academics/exam.service";
import { format } from "date-fns";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";

interface ExamsTableProps {
  exams: Exam[];
  isLoading: boolean;
  onEdit: (examId: string) => void;
  onRefresh: () => void;
  auth: AuthContext;
}

export default function ExamsTable({
  exams,
  isLoading,
  onEdit,
  onRefresh,
  auth,
}: ExamsTableProps) {
  const handleDelete = async (examId: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      await examService.deleteExam(
        examId,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Exam deleted successfully");
      onRefresh();
    } catch (error) {
      toast.error("Failed to delete exam");
    }
  };

  const handlePublish = async (examId: string) => {
    try {
      await examService.publishExam(
        examId,
        auth.token!,
        auth.schoolToken || undefined,
      );
      toast.success("Exam published successfully");
      onRefresh();
    } catch (error) {
      toast.error("Failed to publish exam");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Draft: "bg-gray-500",
      Published: "bg-blue-500",
      InProgress: "bg-yellow-500",
      Completed: "bg-green-500",
      Archived: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading exams...</div>;
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No exams found. Create your first exam to get started.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell className="font-medium">{exam.name}</TableCell>
              <TableCell>{exam.exam_type}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(exam.status)}>
                  {exam.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(exam.start_date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(exam.end_date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(exam.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {exam.status === "Draft" && (
                      <DropdownMenuItem onClick={() => handlePublish(exam.id)}>
                        Publish
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDelete(exam.id)}
                      className="text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
