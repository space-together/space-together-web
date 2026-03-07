"use client";

import type {
  PromotionResult,
  PromotionRule,
} from "@/lib/schema/academics/promotion.schema";
import { promotionService } from "@/service/academics/promotion.service";
import useSWR from "swr";

export function usePromotionRules(
  educationYearId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    educationYearId && token
      ? ["/api/promotions/rules", educationYearId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<PromotionRule[] | null>(
    key,
    () => promotionService.getRules(educationYearId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    rules: data || [],
    isLoading,
    error,
    mutate,
  };
}

export function usePromotionPreview(
  educationYearId?: string,
  classId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    educationYearId && classId && token
      ? [
          "/api/promotions/preview",
          educationYearId,
          classId,
          token,
          schoolToken,
        ]
      : null;

  const { data, error, isLoading, mutate } = useSWR<PromotionResult[] | null>(
    key,
    () =>
      promotionService.previewPromotions(
        educationYearId!,
        classId!,
        token!,
        schoolToken,
      ),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    preview: data || [],
    isLoading,
    error,
    mutate,
  };
}
