"use client";

import type {
  CreateGradingScale,
  GradingScale,
  UpdateGradingScale,
} from "@/lib/schema/academics/grading-scale.schema";
import type { Paginated } from "@/lib/schema/common-schema";
import apiRequest from "@/service/api-client";

export interface GradingScaleFilters {
  education_year_id?: string;
  is_active?: boolean;
  page?: number;
  limit?: number;
}

export const gradingScaleService = {
  async getScaleById(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<GradingScale | null> {
    const result = await apiRequest<undefined, GradingScale>(
      "get",
      `/api/grading-scales/${id}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getScales(
    filters: GradingScaleFilters,
    token: string,
    schoolToken?: string,
  ): Promise<Paginated<GradingScale> | null> {
    const params = new URLSearchParams();
    if (filters.education_year_id)
      params.append("education_year_id", filters.education_year_id);
    if (filters.is_active !== undefined)
      params.append("is_active", filters.is_active.toString());
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const result = await apiRequest<undefined, Paginated<GradingScale>>(
      "get",
      `/api/grading-scales?${params.toString()}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async createScale(
    data: CreateGradingScale,
    token: string,
    schoolToken?: string,
  ): Promise<GradingScale | null> {
    const result = await apiRequest<CreateGradingScale, GradingScale>(
      "post",
      "/api/grading-scales",
      data,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.data || null;
  },

  async updateScale(
    id: string,
    data: UpdateGradingScale,
    token: string,
    schoolToken?: string,
  ): Promise<GradingScale | null> {
    const result = await apiRequest<UpdateGradingScale, GradingScale>(
      "put",
      `/api/grading-scales/${id}`,
      data,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.data || null;
  },

  async activateScale(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<GradingScale | null> {
    const result = await apiRequest<undefined, GradingScale>(
      "post",
      `/api/grading-scales/${id}/activate`,
      undefined,
      { token, schoolToken, revalidatePath: "/a/academics" },
    );
    return result.data || null;
  },
};
