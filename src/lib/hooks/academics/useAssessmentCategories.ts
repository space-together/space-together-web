"use client";

import type { AssessmentCategory } from "@/lib/schema/academics/assessment-category.schema";
import type { Paginated } from "@/lib/schema/common-schema";
import {
    assessmentCategoryService,
    type AssessmentCategoryFilters,
} from "@/service/academics/assessment-category.service";
import useSWR from "swr";

export function useAssessmentCategories(
  filters: AssessmentCategoryFilters,
  token?: string,
  schoolToken?: string,
) {
  const key = token
    ? ["/api/assessment-categories", JSON.stringify(filters), token, schoolToken]
    : null;

  const { data, error, isLoading, mutate } = useSWR<Paginated<AssessmentCategory> | null>(
    key,
    () => assessmentCategoryService.getCategories(filters, token!, schoolToken),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    categories: data?.data || [],
    total: data?.total || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.current_page || 1,
    isLoading,
    error,
    mutate,
  };
}
