"use client";

import type { Score } from "@/lib/schema/academics/score.schema";
import { scoreService, type ScoreFilters } from "@/service/academics/score.service";
import useSWR from "swr";

export function useScores(
  filters: ScoreFilters,
  token?: string,
  schoolToken?: string,
) {
  const key = token
    ? ["/api/scores", JSON.stringify(filters), token, schoolToken]
    : null;

  const { data, error, isLoading, mutate } = useSWR<Score[] | null>(
    key,
    () => scoreService.getScores(filters, token!, schoolToken),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    scores: data || [],
    isLoading,
    error,
    mutate,
  };
}

export function useStudentExamScores(
  studentId?: string,
  examId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    studentId && examId && token
      ? ["/api/scores/student", studentId, examId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<Score[] | null>(
    key,
    () => scoreService.getStudentExamScores(studentId!, examId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    scores: data || [],
    isLoading,
    error,
    mutate,
  };
}
