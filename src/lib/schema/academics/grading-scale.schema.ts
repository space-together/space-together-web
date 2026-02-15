import { z } from "zod";

export const GradingTypeSchema = z.enum(["Letter", "Percentage", "Competency"]);

export const GradeBoundarySchema = z.object({
  grade: z.string().min(1, "Grade is required"),
  min_score: z.number().min(0),
  max_score: z.number().max(100),
  gpa_value: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const GradingScaleSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  education_year_id: z.string(),
  name: z.string().min(1, "Scale name is required"),
  grading_type: GradingTypeSchema,
  grade_boundaries: z.array(GradeBoundarySchema),
  is_active: z.boolean().default(false),
  created_by: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  is_deleted: z.boolean().default(false),
});

export const CreateGradingScaleSchema = z.object({
  education_year_id: z.string().min(1, "Education year is required"),
  name: z.string().min(1, "Scale name is required"),
  grading_type: GradingTypeSchema,
  grade_boundaries: z
    .array(GradeBoundarySchema)
    .min(1, "At least one grade boundary is required"),
});

export const UpdateGradingScaleSchema = CreateGradingScaleSchema.partial();

export type GradingScale = z.infer<typeof GradingScaleSchema>;
export type CreateGradingScale = z.infer<typeof CreateGradingScaleSchema>;
export type UpdateGradingScale = z.infer<typeof UpdateGradingScaleSchema>;
export type GradingType = z.infer<typeof GradingTypeSchema>;
export type GradeBoundary = z.infer<typeof GradeBoundarySchema>;
