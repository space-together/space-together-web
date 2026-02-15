"use client";

import type { Paginated } from "@/lib/schema/common-schema";
import type {
    Announcement,
    AttendanceSummary,
    FinanceSummary,
    ParentDashboard,
    StudentResults,
} from "@/lib/schema/parent/parent-schema";
import { parentService } from "@/service/parent/parent.service";
import useSWR from "swr";

export function useParentDashboard(token?: string, schoolToken?: string) {
  const key = token ? ["/api/v1/parents/dashboard", token, schoolToken] : null;

  const { data, error, isLoading, mutate } = useSWR<ParentDashboard | null>(
    key,
    () => parentService.getDashboard({ token: token!, schoolToken }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    dashboard: data,
    isLoading,
    error,
    mutate,
  };
}

export function useAttendanceSummary(
  studentId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    studentId && token
      ? ["/api/v1/parents/attendance", studentId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<AttendanceSummary | null>(
    key,
    () =>
      parentService.getAttendanceSummary(studentId!, {
        token: token!,
        schoolToken,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    attendance: data,
    isLoading,
    error,
    mutate,
  };
}

export function useStudentResults(
  studentId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    studentId && token
      ? ["/api/v1/parents/results", studentId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<StudentResults | null>(
    key,
    () =>
      parentService.getStudentResults(studentId!, {
        token: token!,
        schoolToken,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    results: data,
    isLoading,
    error,
    mutate,
  };
}

export function useFinanceSummary(
  studentId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    studentId && token
      ? ["/api/v1/parents/finance", studentId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<FinanceSummary | null>(
    key,
    () =>
      parentService.getFinanceSummary(studentId!, {
        token: token!,
        schoolToken,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    finance: data,
    isLoading,
    error,
    mutate,
  };
}

export function useAnnouncements(token?: string, schoolToken?: string) {
  const key = token
    ? ["/api/v1/parents/announcements", token, schoolToken]
    : null;

  const { data, error, isLoading, mutate } = useSWR<Paginated<Announcement> | null>(
    key,
    () => parentService.getAnnouncements({ token: token!, schoolToken }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    announcements: data?.data || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate,
  };
}
