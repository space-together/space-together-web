"use server";
// users.actions.ts
// Server actions for fetching users

import type { RelatedUser } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

export async function searchUsersAction(
  query: string = "",
  limit: number = 20
): Promise<RelatedUser[]> {
  const auth = await authContext();

  if (!auth) {
    throw new Error("Unauthorized - Please log in");
  }

  if (!auth.school?.id) {
    throw new Error("No school context available");
  }

  try {
    // Use the School Member Search API
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: "0",
    });

    if (query.trim()) {
      params.append("filter", query.trim());
    }

    const url = `${API_BASE}/schools/${auth.school.id}/search/members?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
        ...(auth.schoolToken ? { "School-Token": auth.schoolToken } : {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to search users: ${response.status}`
      );
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}
