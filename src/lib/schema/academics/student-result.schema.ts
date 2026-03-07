import { z } from "zod";

export const CategoryScoreSchema = z.object({
  assessment_category_id: z.string(),
  category_name: z.string(),
  score: z.number(),
  max_score: z.number(),
  weight_percentage: z.number(),
});

export const SubjectResultSchema = z.object({
  class_subject_id: z.string(),
  subject_name: z.string(),
  category_scores: z.array(CategoryScoreSchema),
  weighted_score: z.number(),
  percentage: z.number(),
  grade: z.string(),
  credits: z.number().optional().nullable(),
});

export const StudentTermResultSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  student_id: z.string(),
  class_id: z.string(),
  education_year_id: z.string(),
  term_id: z.string(),
  exam_id: z.string(),
  subject_results: z.array(SubjectResultSchema),
  total_score: z.number(),
  total_max_score: z.number(),
  average_percentage: z.number(),
  gpa: z.number(),
  total_credits: z.number().optional().nullable(),
  grade: z.string(),
  rank_in_class: z.number().optional().nullable(),
  total_students: z.number().optional().nullable(),
  calculated_at: z.string().datetime(),
  is_finalized: z.boolean().default(false),
});

export type CategoryScore = z.infer<typeof CategoryScoreSchema>;
export type SubjectResult = z.infer<typeof SubjectResultSchema>;
export type StudentTermResult = z.infer<typeof StudentTermResultSchema>;
