"use client";

import type { StudentTermResult } from "@/lib/schema/academics/student-result.schema";
import { resultService } from "@/service/academics/result.service";
import useSWR from "swr";

export function useStudentTermResult(
  studentId?: string,
  termId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    studentId && termId && token
      ? ["/api/results/student", studentId, termId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<StudentTermResult | null>(
    key,
    () => resultService.getStudentTermResults(studentId!, termId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    result: data,
    isLoading,
    error,
    mutate,
  };
}

export function useClassResults(
  classId?: string,
  examId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    classId && examId && token
      ? ["/api/results/class", classId, examId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<StudentTermResult[] | null>(
    key,
    () => resultService.getClassResults(classId!, examId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    results: data || [],
    isLoading,
    error,
    mutate,
  };
}
