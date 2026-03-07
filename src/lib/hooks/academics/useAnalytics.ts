"use client";

import type {
    AtRiskStudent,
    PerformanceTrend,
    ScoreDistribution,
    SubjectPassRate,
    TopStudent,
} from "@/service/academics/analytics.service";
import { analyticsService } from "@/service/academics/analytics.service";
import useSWR from "swr";

export function useScoreDistribution(
  classId?: string,
  examId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    classId && examId && token
      ? ["/api/analytics/distribution", classId, examId, token, schoolToken]
      : null;

  const { data, error, isLoading } = useSWR<ScoreDistribution[] | null>(
    key,
    () => analyticsService.getScoreDistribution(classId!, examId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    distribution: data || [],
    isLoading,
    error,
  };
}

export function useSubjectPassRate(
  subjectId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key = subjectId && token
    ? ["/api/analytics/pass-rate", subjectId, token, schoolToken]
    : null;

  const { data, error, isLoading } = useSWR<SubjectPassRate | null>(
    key,
    () => analyticsService.getSubjectPassRate(subjectId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    passRate: data,
    isLoading,
    error,
  };
}

export function useTopStudents(
  classId?: string,
  limit: number = 10,
  token?: string,
  schoolToken?: string,
) {
  const key = classId && token
    ? ["/api/analytics/top-students", classId, limit, token, schoolToken]
    : null;

  const { data, error, isLoading } = useSWR<TopStudent[] | null>(
    key,
    () => analyticsService.getTopStudents(classId!, limit, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    topStudents: data || [],
    isLoading,
    error,
  };
}

export function useAtRiskStudents(
  classId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key = classId && token
    ? ["/api/analytics/at-risk", classId, token, schoolToken]
    : null;

  const { data, error, isLoading } = useSWR<AtRiskStudent[] | null>(
    key,
    () => analyticsService.getAtRiskStudents(classId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    atRiskStudents: data || [],
    isLoading,
    error,
  };
}

export function usePerformanceTrends(
  token?: string,
  schoolToken?: string,
) {
  const key = token
    ? ["/api/analytics/trends", token, schoolToken]
    : null;

  const { data, error, isLoading } = useSWR<PerformanceTrend[] | null>(
    key,
    () => analyticsService.getPerformanceTrends(token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    trends: data || [],
    isLoading,
    error,
  };
}
