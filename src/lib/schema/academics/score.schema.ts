import { z } from "zod";

export const ScoreSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  student_id: z.string(),
  class_subject_id: z.string(),
  exam_id: z.string(),
  assessment_category_id: z.string(),
  education_year_id: z.string(),
  score: z.number().min(0),
  max_score: z.number().min(0),
  percentage: z.number().min(0).max(100),
  remarks: z.string().optional().nullable(),
  entered_by: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  is_deleted: z.boolean().default(false),
});

export const CreateScoreSchema = z.object({
  student_id: z.string().min(1, "Student is required"),
  class_subject_id: z.string().min(1, "Subject is required"),
  exam_id: z.string().min(1, "Exam is required"),
  assessment_category_id: z.string().min(1, "Assessment category is required"),
  education_year_id: z.string().min(1, "Education year is required"),
  score: z.number().min(0, "Score must be at least 0"),
  max_score: z.number().min(0, "Max score must be at least 0"),
  remarks: z.string().optional(),
});

export const BulkScoreEntrySchema = z.object({
  exam_id: z.string().min(1, "Exam is required"),
  class_subject_id: z.string().min(1, "Subject is required"),
  assessment_category_id: z.string().min(1, "Assessment category is required"),
  education_year_id: z.string().min(1, "Education year is required"),
  scores: z.array(
    z.object({
      student_id: z.string(),
      score: z.number().min(0),
      max_score: z.number().min(0),
      remarks: z.string().optional(),
    }),
  ),
});

export const UpdateScoreSchema = z.object({
  score: z.number().min(0),
  max_score: z.number().min(0).optional(),
  remarks: z.string().optional(),
});

export type Score = z.infer<typeof ScoreSchema>;
export type CreateScore = z.infer<typeof CreateScoreSchema>;
export type BulkScoreEntry = z.infer<typeof BulkScoreEntrySchema>;
export type UpdateScore = z.infer<typeof UpdateScoreSchema>;
