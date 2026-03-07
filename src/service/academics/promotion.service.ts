"use client";

import { PromotionStatusSchema } from "@/lib/schema/academics/transcript.schema";
import apiRequest from "@/service/api-client";
import { z } from "zod";

export const PromotionRuleSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  education_year_id: z.string(),
  name: z.string(),
  min_gpa_threshold: z.number(),
  min_attendance_percentage: z.number().optional().nullable(),
  required_subjects_passed: z.array(z.string()).optional().nullable(),
  custom_rules: z.any().optional().nullable(),
  created_by: z.string(),
  created_at: z.string().datetime(),
});

export const CreatePromotionRuleSchema = z.object({
  education_year_id: z.string().min(1, "Education year is required"),
  name: z.string().min(1, "Rule name is required"),
  min_gpa_threshold: z.number().min(0).max(4),
  min_attendance_percentage: z.number().min(0).max(100).optional(),
  required_subjects_passed: z.array(z.string()).optional(),
  custom_rules: z.any().optional(),
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

export type PromotionRule = z.infer<typeof PromotionRuleSchema>;
export type CreatePromotionRule = z.infer<typeof CreatePromotionRuleSchema>;
export type PromotionResult = z.infer<typeof PromotionResultSchema>;
export type PromotionBatch = z.infer<typeof PromotionBatchSchema>;

export const promotionService = {
  async getRules(
    educationYearId: string,
    token: string,
    schoolToken?: string,
  ): Promise<PromotionRule[] | null> {
    const result = await apiRequest<undefined, PromotionRule[]>(
      "get",
      `/api/promotions/rules?education_year_id=${educationYearId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async createRule(
    data: CreatePromotionRule,
    token: string,
    schoolToken?: string,
  ): Promise<PromotionRule | null> {
    const result = await apiRequest<CreatePromotionRule, PromotionRule>(
      "post",
      "/api/promotions/rules",
      data,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.data || null;
  },

  async evaluatePromotions(
    educationYearId: string,
    token: string,
    schoolToken?: string,
  ): Promise<PromotionBatch | null> {
    const result = await apiRequest<undefined, PromotionBatch>(
      "post",
      `/api/promotions/evaluate/${educationYearId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async previewPromotions(
    educationYearId: string,
    classId: string,
    token: string,
    schoolToken?: string,
  ): Promise<PromotionResult[] | null> {
    const result = await apiRequest<undefined, PromotionResult[]>(
      "get",
      `/api/promotions/preview/${educationYearId}/${classId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async executePromotion(
    batchId: string,
    token: string,
    schoolToken?: string,
  ): Promise<{ success: boolean; message: string } | null> {
    const result = await apiRequest<
      undefined,
      { success: boolean; message: string }
    >("post", `/api/promotions/execute/${batchId}`, undefined, {
      token,
      schoolToken,
      revalidatePath: "/a/academics",
    });
    return result.data || null;
  },
};
