import { z } from "zod";

export const ExamTypeSchema = z.enum([
  "Continuous",
  "Midterm",
  "Final",
  "Quiz",
  "Assignment",
]);

export const ExamStatusSchema = z.enum([
  "Draft",
  "Published",
  "InProgress",
  "Completed",
  "Archived",
]);

export const ExamSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  education_year_id: z.string(),
  term_id: z.string().optional().nullable(),
  class_id: z.string().optional().nullable(),
  name: z.string().min(1, "Exam name is required"),
  description: z.string().optional().nullable(),
  exam_type: ExamTypeSchema,
  status: ExamStatusSchema,
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  created_by: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  is_deleted: z.boolean().default(false),
});

export const CreateExamSchema = z.object({
  education_year_id: z.string().min(1, "Education year is required"),
  term_id: z.string().optional(),
  class_id: z.string().optional(),
  name: z.string().min(1, "Exam name is required"),
  description: z.string().optional(),
  exam_type: ExamTypeSchema,
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
});

export const UpdateExamSchema = CreateExamSchema.partial();

export type Exam = z.infer<typeof ExamSchema>;
export type CreateExam = z.infer<typeof CreateExamSchema>;
export type UpdateExam = z.infer<typeof UpdateExamSchema>;
export type ExamType = z.infer<typeof ExamTypeSchema>;
export type ExamStatus = z.infer<typeof ExamStatusSchema>;
