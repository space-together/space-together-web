import type { Paginated } from "@/lib/schema/common-schema";
import type {
    Announcement,
    AttendanceSummary,
    FinanceSummary,
    ParentDashboard,
    StudentResults,
} from "@/lib/schema/parent/parent-schema";
import apiRequest from "../api-client";

export interface ParentServiceOptions {
  token: string;
  schoolToken?: string | null;
}

class ParentService {
  async getDashboard(
    options: ParentServiceOptions,
  ): Promise<ParentDashboard | null> {
    const response = await apiRequest<void, ParentDashboard>(
      "get",
      "/api/v1/parents/dashboard",
      undefined,
      {
        token: options.token,
        schoolToken: options.schoolToken,
      },
    );
    return response.data || null;
  }

  async getAttendanceSummary(
    studentId: string,
    options: ParentServiceOptions,
  ): Promise<AttendanceSummary | null> {
    const response = await apiRequest<void, AttendanceSummary>(
      "get",
      `/api/v1/parents/${studentId}/attendance`,
      undefined,
      {
        token: options.token,
        schoolToken: options.schoolToken,
      },
    );
    return response.data || null;
  }

  async getStudentResults(
    studentId: string,
    options: ParentServiceOptions,
  ): Promise<StudentResults | null> {
    const response = await apiRequest<void, StudentResults>(
      "get",
      `/api/v1/parents/${studentId}/results`,
      undefined,
      {
        token: options.token,
        schoolToken: options.schoolToken,
      },
    );
    return response.data || null;
  }

  async getFinanceSummary(
    studentId: string,
    options: ParentServiceOptions,
  ): Promise<FinanceSummary | null> {
    const response = await apiRequest<void, FinanceSummary>(
      "get",
      `/api/v1/parents/${studentId}/finance`,
      undefined,
      {
        token: options.token,
        schoolToken: options.schoolToken,
      },
    );
    return response.data || null;
  }

  async getAnnouncements(
    options: ParentServiceOptions,
  ): Promise<Paginated<Announcement> | null> {
    const response = await apiRequest<void, Paginated<Announcement>>(
      "get",
      "/api/v1/parents/announcements",
      undefined,
      {
        token: options.token,
        schoolToken: options.schoolToken,
      },
    );
    return response.data || null;
  }
}

export const parentService = new ParentService();
