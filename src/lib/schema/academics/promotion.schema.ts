import { z } from "zod";
import { PromotionStatusSchema } from "./transcript.schema";

export const PromotionRuleSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  education_year_id: z.string(),
  name: z.string().min(1, "Rule name is required"),
  min_gpa_threshold: z.number().min(0),
  min_attendance_percentage: z.number().min(0).max(100).optional().nullable(),
  required_subjects_passed: z.array(z.string()).optional().nullable(),
  custom_rules: z.any().optional().nullable(),
  created_by: z.string(),
  created_at: z.string().datetime(),
});

export const PromotionResultSchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  current_gpa: z.number(),
  promotion_status: PromotionStatusSchema,
  reason: z.string(),
  promoted_to_class_id: z.string().optional().nullable(),
});

export const PromotionBatchSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  education_year_id: z.string(),
  from_class_id: z.string(),
  to_class_id: z.string().optional().nullable(),
  promotion_results: z.array(PromotionResultSchema),
  executed_by: z.string(),
  executed_at: z.string().datetime(),
});

export const CreatePromotionRuleSchema = z.object({
  education_year_id: z.string().min(1, "Education year is required"),
  name: z.string().min(1, "Rule name is required"),
  min_gpa_threshold: z.number().min(0, "GPA threshold must be at least 0"),
  min_attendance_percentage: z
    .number()
    .min(0)
    .max(100)
    .optional(),
  required_subjects_passed: z.array(z.string()).optional(),
  custom_rules: z.any().optional(),
});

export type PromotionRule = z.infer<typeof PromotionRuleSchema>;
export type PromotionResult = z.infer<typeof PromotionResultSchema>;
export type PromotionBatch = z.infer<typeof PromotionBatchSchema>;
export type CreatePromotionRule = z.infer<typeof CreatePromotionRuleSchema>;
