"use client";

import type { StudentTermResult } from "@/lib/schema/academics/student-result.schema";
import apiRequest from "@/service/api-client";

export const resultService = {
  async calculateResults(
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<{ success: boolean; message: string } | null> {
    const result = await apiRequest<
      undefined,
      { success: boolean; message: string }
    >("post", `/api/results/calculate/${examId}`, undefined, {
      token,
      schoolToken,
      revalidatePath: "/a/academics",
    });
    return result.data || null;
  },

  async getStudentTermResults(
    studentId: string,
    termId: string,
    token: string,
    schoolToken?: string,
  ): Promise<StudentTermResult | null> {
    const result = await apiRequest<undefined, StudentTermResult>(
      "get",
      `/api/results/student/${studentId}/term/${termId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getClassResults(
    classId: string,
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<StudentTermResult[] | null> {
    const result = await apiRequest<undefined, StudentTermResult[]>(
      "get",
      `/api/results/class/${classId}/exam/${examId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },
};
