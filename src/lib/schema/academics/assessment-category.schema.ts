import { z } from "zod";

export const AssessmentCategorySchema = z.object({
  id: z.string(),
  school_id: z.string(),
  class_subject_id: z.string(),
  education_year_id: z.string(),
  name: z.string().min(1, "Category name is required"),
  code: z.string().min(1, "Category code is required"),
  weight_percentage: z
    .number()
    .min(0, "Weight must be at least 0")
    .max(100, "Weight cannot exceed 100"),
  description: z.string().optional().nullable(),
  created_by: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  is_deleted: z.boolean().default(false),
});

export const CreateAssessmentCategorySchema = z.object({
  class_subject_id: z.string().min(1, "Subject is required"),
  education_year_id: z.string().min(1, "Education year is required"),
  name: z.string().min(1, "Category name is required"),
  code: z.string().min(1, "Category code is required"),
  weight_percentage: z
    .number()
    .min(0, "Weight must be at least 0")
    .max(100, "Weight cannot exceed 100"),
  description: z.string().optional(),
});

export const UpdateAssessmentCategorySchema =
  CreateAssessmentCategorySchema.partial();

export type AssessmentCategory = z.infer<typeof AssessmentCategorySchema>;
export type CreateAssessmentCategory = z.infer<
  typeof CreateAssessmentCategorySchema
>;
export type UpdateAssessmentCategory = z.infer<
  typeof UpdateAssessmentCategorySchema
>;
