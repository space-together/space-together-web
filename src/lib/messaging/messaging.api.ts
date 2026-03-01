// messaging.api.ts
// REST API client for messaging endpoints

import { getAuthHeaders } from "@/lib/utils/client-auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

class MessagingApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "MessagingApiError";
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const authHeaders = getAuthHeaders();

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    // Enhanced error message for 401 Unauthorized
    if (response.status === 401) {
      throw new MessagingApiError(
        response.status,
        "Unauthorized - Please log in again",
        errorData.code
      );
    }

    throw new MessagingApiError(
      response.status,
      errorData.message || `Request failed with status ${response.status}`,
      errorData.code
    );
  }

  return response.json();
}

export async function getConversations(page: number = 1, limit: number = 20) {
  return fetchWithAuth(
    `${API_BASE}/m-conversations?page=${page}&limit=${limit}`
  );
}

export async function getConversationMessages(
  conversationId: string,
  page: number = 1,
  limit: number = 50
) {
  return fetchWithAuth(
    `${API_BASE}/m-conversations/${conversationId}/messages?page=${page}&limit=${limit}`
  );
}

export async function createConversation(payload: {
  participants: string[];
  is_group: boolean;
  name?: string;
  encrypted_keys: Array<{ user_id: string; encrypted_key: string }>;
}) {
  return fetchWithAuth(`${API_BASE}/m-conversations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function sendMessage(
  conversationId: string,
  payload: {
    encrypted_payload: string;
    nonce: string;
    key_version: number;
    message_type: "TEXT" | "FILE";
    file_url?: string;
    file_public_id?: string;
    client_message_id: string;
  }
) {
  return fetchWithAuth(`${API_BASE}/m-conversations/${conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getConversationKey(conversationId: string) {
  return fetchWithAuth(`${API_BASE}/m-conversations/${conversationId}/key`);
}

export async function markConversationAsRead(conversationId: string) {
  return fetchWithAuth(`${API_BASE}/m-conversations/${conversationId}/read`, {
    method: "POST",
  });
}

export async function getUserPublicKeys(userIds: string[]) {
  return fetchWithAuth(
    `${API_BASE}/m/users/public-keys?user_ids=${userIds.join(",")}`
  );
}
