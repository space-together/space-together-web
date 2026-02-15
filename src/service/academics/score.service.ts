"use client";

import type {
    BulkScoreEntry,
    CreateScore,
    Score,
    UpdateScore,
} from "@/lib/schema/academics/score.schema";
import apiRequest from "@/service/api-client";

export interface ScoreFilters {
  student_id?: string;
  class_subject_id?: string;
  exam_id?: string;
  page?: number;
  limit?: number;
}

export const scoreService = {
  async getScores(
    filters: ScoreFilters,
    token: string,
    schoolToken?: string,
  ): Promise<Score[] | null> {
    const params = new URLSearchParams();
    if (filters.student_id) params.append("student_id", filters.student_id);
    if (filters.class_subject_id)
      params.append("class_subject_id", filters.class_subject_id);
    if (filters.exam_id) params.append("exam_id", filters.exam_id);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const result = await apiRequest<undefined, Score[]>(
      "get",
      `/api/scores?${params.toString()}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async createScore(
    data: CreateScore,
    token: string,
    schoolToken?: string,
  ): Promise<Score | null> {
    const result = await apiRequest<CreateScore, Score>(
      "post",
      "/api/scores",
      data,
      { token, schoolToken, revalidatePath: "/t/classes" },
    );
    return result.data || null;
  },

  async bulkCreateScores(
    data: BulkScoreEntry,
    token: string,
    schoolToken?: string,
  ): Promise<Score[] | null> {
    const result = await apiRequest<BulkScoreEntry, Score[]>(
      "post",
      "/api/scores/bulk",
      data,
      { token, schoolToken, revalidatePath: "/t/classes" },
    );
    return result.data || null;
  },

  async updateScore(
    id: string,
    data: UpdateScore,
    token: string,
    schoolToken?: string,
  ): Promise<Score | null> {
    const result = await apiRequest<UpdateScore, Score>(
      "put",
      `/api/scores/${id}`,
      data,
      { token, schoolToken, revalidatePath: "/t/classes" },
    );
    return result.data || null;
  },

  async getStudentExamScores(
    studentId: string,
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<Score[] | null> {
    const result = await apiRequest<undefined, Score[]>(
      "get",
      `/api/scores/student/${studentId}/exam/${examId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },
};
