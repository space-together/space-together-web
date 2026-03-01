// useConversations.ts
// Hook for fetching and managing conversations list

import { getAuthHeaders } from "@/lib/utils/client-auth";
import useSWR from "swr";
import type { ConversationWithRelations } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

interface ConversationsResponse {
  data: ConversationWithRelations[];
  total: number;
  page: number;
  limit: number;
}

async function fetcher(url: string): Promise<ConversationsResponse> {
  const authHeaders = getAuthHeaders();

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch conversations: ${res.status}`);
  }

  return res.json();
}

export function useConversations(page: number = 1, limit: number = 20) {
  const { data, error, isLoading, mutate } = useSWR<ConversationsResponse>(
    `${API_BASE}/m-conversations?page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    conversations: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
    mutate,
  };
}
