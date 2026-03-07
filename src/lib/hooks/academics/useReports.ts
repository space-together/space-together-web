"use client";

import type { ReportCard } from "@/lib/schema/academics/report-card.schema";
import { reportService } from "@/service/academics/report.service";
import useSWR from "swr";

export function useReport(
  id?: string,
  token?: string,
  schoolToken?: string,
) {
  const key = id && token ? ["/api/reports", id, token, schoolToken] : null;

  const { data, error, isLoading, mutate } = useSWR<ReportCard | null>(
    key,
    () => reportService.getReport(id!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    report: data,
    isLoading,
    error,
    mutate,
  };
}

export function useStudentReports(
  studentId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    studentId && token
      ? ["/api/reports/student", studentId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<ReportCard[] | null>(
    key,
    () => reportService.getStudentReports(studentId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    reports: data || [],
    isLoading,
    error,
    mutate,
  };
}
