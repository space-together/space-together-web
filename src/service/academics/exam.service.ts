"use client";

import type {
    CreateExam,
    Exam,
    UpdateExam,
} from "@/lib/schema/academics/exam.schema";
import type { Paginated } from "@/lib/schema/common-schema";
import apiRequest from "@/service/api-client";

export interface ExamFilters {
  education_year_id?: string;
  class_id?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const examService = {
  async getExams(
    filters: ExamFilters,
    token: string,
    schoolToken?: string,
  ): Promise<Paginated<Exam> | null> {
    const params = new URLSearchParams();
    if (filters.education_year_id)
      params.append("education_year_id", filters.education_year_id);
    if (filters.class_id) params.append("class_id", filters.class_id);
    if (filters.status) params.append("status", filters.status);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const result = await apiRequest<undefined, Paginated<Exam>>(
      "get",
      `/api/exams?${params.toString()}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getExamById(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<Exam | null> {
    const result = await apiRequest<undefined, Exam>(
      "get",
      `/api/exams/${id}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async createExam(
    data: CreateExam,
    token: string,
    schoolToken?: string,
  ): Promise<Exam | null> {
    const result = await apiRequest<CreateExam, Exam>(
      "post",
      "/api/exams",
      data,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.data || null;
  },

  async updateExam(
    id: string,
    data: UpdateExam,
    token: string,
    schoolToken?: string,
  ): Promise<Exam | null> {
    const result = await apiRequest<UpdateExam, Exam>(
      "put",
      `/api/exams/${id}`,
      data,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.data || null;
  },

  async deleteExam(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<boolean> {
    const result = await apiRequest<undefined, void>(
      "delete",
      `/api/exams/${id}`,
      undefined,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.statusCode === 200;
  },

  async publishExam(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<Exam | null> {
    const result = await apiRequest<undefined, Exam>(
      "post",
      `/api/exams/${id}/publish`,
      undefined,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.data || null;
  },
};
