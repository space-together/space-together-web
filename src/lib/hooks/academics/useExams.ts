"use client";

import type { Exam } from "@/lib/schema/academics/exam.schema";
import type { Paginated } from "@/lib/schema/common-schema";
import { examService, type ExamFilters } from "@/service/academics/exam.service";
import useSWR from "swr";

export function useExams(
  filters: ExamFilters,
  token?: string,
  schoolToken?: string,
) {
  const key = token
    ? ["/api/exams", JSON.stringify(filters), token, schoolToken]
    : null;

  const { data, error, isLoading, mutate } = useSWR<Paginated<Exam> | null>(
    key,
    () => examService.getExams(filters, token!, schoolToken),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    exams: data?.data || [],
    total: data?.total || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.current_page || 1,
    isLoading,
    error,
    mutate,
  };
}

export function useExam(id?: string, token?: string, schoolToken?: string) {
  const key = id && token ? ["/api/exams", id, token, schoolToken] : null;

  const { data, error, isLoading, mutate } = useSWR<Exam | null>(
    key,
    () => examService.getExamById(id!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    exam: data,
    isLoading,
    error,
    mutate,
  };
}
