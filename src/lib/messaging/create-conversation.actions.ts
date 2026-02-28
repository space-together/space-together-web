"use server";
// create-conversation.actions.ts
// Server action for creating conversations matching backend API

import type { userRole } from "@/lib/schema/common-details-schema";
import type { RelatedUser } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

export interface EncryptedKeyForUser {
  user_id: string;
  user_role: userRole;
  encrypted_key: string;
}

export interface CreateConversationPayload {
  participants: RelatedUser[];
  is_group: boolean;
  name?: string;
  encrypted_keys: EncryptedKeyForUser[];
}

export async function createConversationAction(payload: CreateConversationPayload) {
  const auth = await authContext();

  if (!auth) {
    throw new Error("Unauthorized - Please log in");
  }

  try {
    const response = await fetch(`${API_BASE}/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
        ...(auth.schoolToken ? { "School-Token": auth.schoolToken } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create conversation: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
}

export async function getUserPublicKeysAction(userIds: string[]) {
  const auth = await authContext();

  if (!auth) {
    throw new Error("Unauthorized - Please log in");
  }

  try {
    const response = await fetch(
      `${API_BASE}/m/users/public-keys?user_ids=${userIds.join(",")}`,
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
        errorData.message || `Failed to get public keys: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting public keys:", error);
    throw error;
  }
}
