"use client";

import apiRequest from "@/service/api-client";
import { z } from "zod";

export const ScoreDistributionSchema = z.object({
  range: z.string(),
  count: z.number(),
  percentage: z.number(),
});

export const SubjectPassRateSchema = z.object({
  subject_id: z.string(),
  subject_name: z.string(),
  total_students: z.number(),
  passed: z.number(),
  failed: z.number(),
  pass_rate: z.number(),
  average_score: z.number(),
});

export const TopStudentSchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  gpa: z.number(),
  average_percentage: z.number(),
  rank: z.number(),
});

export const AtRiskStudentSchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  gpa: z.number(),
  average_percentage: z.number(),
  subjects_failing: z.number(),
  attendance_percentage: z.number().optional(),
});

export const PerformanceTrendSchema = z.object({
  period: z.string(),
  average_gpa: z.number(),
  pass_rate: z.number(),
  total_students: z.number(),
});

export type ScoreDistribution = z.infer<typeof ScoreDistributionSchema>;
export type SubjectPassRate = z.infer<typeof SubjectPassRateSchema>;
export type TopStudent = z.infer<typeof TopStudentSchema>;
export type AtRiskStudent = z.infer<typeof AtRiskStudentSchema>;
export type PerformanceTrend = z.infer<typeof PerformanceTrendSchema>;

export const analyticsService = {
  async getScoreDistribution(
    classId: string,
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<ScoreDistribution[] | null> {
    const result = await apiRequest<undefined, ScoreDistribution[]>(
      "get",
      `/api/analytics/class/${classId}/exam/${examId}/distribution`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getSubjectPassRate(
    subjectId: string,
    token: string,
    schoolToken?: string,
  ): Promise<SubjectPassRate | null> {
    const result = await apiRequest<undefined, SubjectPassRate>(
      "get",
      `/api/analytics/subject/${subjectId}/pass-rate`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getTopStudents(
    classId: string,
    limit: number = 10,
    token: string,
    schoolToken?: string,
  ): Promise<TopStudent[] | null> {
    const result = await apiRequest<undefined, TopStudent[]>(
      "get",
      `/api/analytics/class/${classId}/top-students?limit=${limit}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getAtRiskStudents(
    classId: string,
    token: string,
    schoolToken?: string,
  ): Promise<AtRiskStudent[] | null> {
    const result = await apiRequest<undefined, AtRiskStudent[]>(
      "get",
      `/api/analytics/class/${classId}/at-risk`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getPerformanceTrends(
    token: string,
    schoolToken?: string,
  ): Promise<PerformanceTrend[] | null> {
    const result = await apiRequest<undefined, PerformanceTrend[]>(
      "get",
      "/api/analytics/school/performance-trends",
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },
};
