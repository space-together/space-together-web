"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useExam } from "@/lib/hooks/academics/useExams";
import {
    CreateExamSchema,
    ExamTypeSchema,
    type CreateExam
} from "@/lib/schema/academics/exam.schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { examService } from "@/service/academics/exam.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ExamDialogProps {
  open: boolean;
  onClose: () => void;
  examId?: string;
  auth: AuthContext;
}

export default function ExamDialog({
  open,
  onClose,
  examId,
  auth,
}: ExamDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { exam, isLoading } = useExam(
    examId,
    auth.token,
    auth.schoolToken || undefined,
  );

  const form = useForm<CreateExam>({
    resolver: zodResolver(CreateExamSchema),
    defaultValues: {
      education_year_id: "",
      term_id: "",
      class_id: "",
      name: "",
      description: "",
      exam_type: "Midterm",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
    },
  });

  useEffect(() => {
    if (exam) {
      form.reset({
        education_year_id: exam.education_year_id,
        term_id: exam.term_id || "",
        class_id: exam.class_id || "",
        name: exam.name,
        description: exam.description || "",
        exam_type: exam.exam_type,
        start_date: exam.start_date,
        end_date: exam.end_date,
      });
    }
  }, [exam, form]);

  const onSubmit = async (data: CreateExam) => {
    setIsSubmitting(true);
    try {
      if (examId) {
        await examService.updateExam(
          examId,
          data,
          auth.token!,
          auth.schoolToken || undefined,
        );
        toast.success("Exam updated successfully");
      } else {
        await examService.createExam(
          data,
          auth.token!,
          auth.schoolToken || undefined,
        );
        toast.success("Exam created successfully");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save exam");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{examId ? "Edit Exam" : "Create Exam"}</DialogTitle>
          <DialogDescription>
            {examId
              ? "Update exam details"
              : "Create a new exam for assessment"}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Term 1 Exam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exam_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ExamTypeSchema.options.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value).toISOString())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value).toISOString())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Exam description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {examId ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
