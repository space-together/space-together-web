"use client";

import type {
    AssessmentCategory,
    CreateAssessmentCategory,
    UpdateAssessmentCategory,
} from "@/lib/schema/academics/assessment-category.schema";
import type { Paginated } from "@/lib/schema/common-schema";
import apiRequest from "@/service/api-client";

export interface AssessmentCategoryFilters {
  class_subject_id?: string;
  education_year_id?: string;
  page?: number;
  limit?: number;
}

export const assessmentCategoryService = {
  async getCategories(
    filters: AssessmentCategoryFilters,
    token: string,
    schoolToken?: string,
  ): Promise<Paginated<AssessmentCategory> | null> {
    const params = new URLSearchParams();
    if (filters.class_subject_id)
      params.append("class_subject_id", filters.class_subject_id);
    if (filters.education_year_id)
      params.append("education_year_id", filters.education_year_id);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const result = await apiRequest<undefined, Paginated<AssessmentCategory>>(
      "get",
      `/api/assessment-categories?${params.toString()}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async createCategory(
    data: CreateAssessmentCategory,
    token: string,
    schoolToken?: string,
  ): Promise<AssessmentCategory | null> {
    const result = await apiRequest<
      CreateAssessmentCategory,
      AssessmentCategory
    >("post", "/api/assessment-categories", data, {
      token,
      schoolToken,
      revalidatePath: "/a/academics",
    });
    return result.data || null;
  },

  async updateCategory(
    id: string,
    data: UpdateAssessmentCategory,
    token: string,
    schoolToken?: string,
  ): Promise<AssessmentCategory | null> {
    const result = await apiRequest<
      UpdateAssessmentCategory,
      AssessmentCategory
    >("put", `/api/assessment-categories/${id}`, data, {
      token,
      schoolToken,
      revalidatePath: "/a/academics",
    });
    return result.data || null;
  },

  async deleteCategory(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<boolean> {
    const result = await apiRequest<undefined, void>(
      "delete",
      `/api/assessment-categories/${id}`,
      undefined,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.statusCode === 200;
  },

  async validateWeight(
    classSubjectId: string,
    token: string,
    schoolToken?: string,
  ): Promise<{ total_weight: number; is_valid: boolean } | null> {
    const result = await apiRequest<
      undefined,
      { total_weight: number; is_valid: boolean }
    >(
      "get",
      `/api/assessment-categories/validate/${classSubjectId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },
};
