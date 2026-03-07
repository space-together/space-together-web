"use client";

import type { GradingScale } from "@/lib/schema/academics/grading-scale.schema";
import type { Paginated } from "@/lib/schema/common-schema";
import {
    gradingScaleService,
    type GradingScaleFilters,
} from "@/service/academics/grading-scale.service";
import useSWR from "swr";

export function useGradingScales(
  filters: GradingScaleFilters,
  token?: string,
  schoolToken?: string,
) {
  const key = token
    ? ["/api/grading-scales", JSON.stringify(filters), token, schoolToken]
    : null;

  const { data, error, isLoading, mutate } = useSWR<Paginated<GradingScale> | null>(
    key,
    () => gradingScaleService.getScales(filters, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    scales: data?.data || [],
    activeScale: data?.data?.find((s) => s.is_active),
    total: data?.total || 0,
    isLoading,
    error,
    mutate,
  };
}

export function useGradingScale(
  id?: string,
  token?: string,
  schoolToken?: string,
) {
  const key = id && token ? ["/api/grading-scales", id, token, schoolToken] : null;

  const { data, error, isLoading, mutate } = useSWR<GradingScale | null>(
    key,
    () => gradingScaleService.getScaleById(id!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    scale: data,
    isLoading,
    error,
    mutate,
  };
}
