"use client";

import type { ClassRanking } from "@/service/academics/ranking.service";
import { rankingService } from "@/service/academics/ranking.service";
import useSWR from "swr";

export function useClassRankings(
  classId?: string,
  examId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    classId && examId && token
      ? ["/api/rankings/class", classId, examId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<ClassRanking | null>(
    key,
    () => rankingService.getClassRankings(classId!, examId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    ranking: data,
    rankings: data?.rankings || [],
    isLoading,
    error,
    mutate,
  };
}
