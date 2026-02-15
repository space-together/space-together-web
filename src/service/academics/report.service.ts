"use client";

import type { ReportCard } from "@/lib/schema/academics/report-card.schema";
import apiRequest from "@/service/api-client";

export const reportService = {
  async generateReport(
    studentId: string,
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<ReportCard | null> {
    const result = await apiRequest<undefined, ReportCard>(
      "post",
      `/api/reports/generate/${studentId}/${examId}`,
      undefined,
      { token, schoolToken, revalidatePath: "/s/results" },
    );
    return result.data || null;
  },

  async getReport(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<ReportCard | null> {
    const result = await apiRequest<undefined, ReportCard>(
      "get",
      `/api/reports/${id}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getStudentReports(
    studentId: string,
    token: string,
    schoolToken?: string,
  ): Promise<ReportCard[] | null> {
    const result = await apiRequest<undefined, ReportCard[]>(
      "get",
      `/api/reports/student/${studentId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async bulkGenerateReports(
    examId: string,
    token: string,
    schoolToken?: string,
  ): Promise<boolean> {
    const result = await apiRequest<undefined, void>(
      "post",
      `/api/reports/bulk/${examId}`,
      undefined,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.statusCode === 200;
  },
};
