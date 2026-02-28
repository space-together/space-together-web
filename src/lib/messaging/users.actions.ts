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

  try {
    // Adjust the endpoint based on your backend API
    const url = query
      ? `${API_BASE}/users/search?q=${encodeURIComponent(query)}&limit=${limit}`
      : `${API_BASE}/users?limit=${limit}`;

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
    return data.users || data || [];
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}
