"use server";
// conversations.actions.ts
// Server actions for fetching conversations with authentication

import { authContext } from "@/lib/utils/auth-context";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

export async function getConversationsAction(page: number = 1, limit: number = 50) {
  const auth = await authContext();

  if (!auth) {
    throw new Error("Unauthorized - Please log in");
  }

  try {
    const response = await fetch(
      `${API_BASE}/m-conversations?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
          ...(auth.schoolToken ? { "School-Token": auth.schoolToken } : {}),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch conversations: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
}
