"use client";

import apiRequest from "@/service/api-client";
import { z } from "zod";

export const StudentRankSchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
  gpa: z.number(),
  average_percentage: z.number(),
  rank: z.number(),
  total_students: z.number(),
});

export const ClassRankingSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  class_id: z.string(),
  exam_id: z.string(),
  education_year_id: z.string(),
  rankings: z.array(StudentRankSchema),
  calculated_at: z.string().datetime(),
});

export type StudentRank = z.infer<typeof StudentRankSchema>;
export type ClassRanking = z.infer<typeof ClassRankingSchema>;

export const rankingService = {
  async calculateRankings(
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<{ success: boolean; message: string } | null> {
    const result = await apiRequest<
      undefined,
      { success: boolean; message: string }
    >("post", `/api/rankings/calculate/${examId}`, undefined, {
      token,
      schoolToken,
      revalidatePath: "/a/academics",
    });
    return result.data || null;
  },

  async getClassRankings(
    classId: string,
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<ClassRanking | null> {
    const result = await apiRequest<undefined, ClassRanking>(
      "get",
      `/api/rankings/class/${classId}/exam/${examId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },
};
