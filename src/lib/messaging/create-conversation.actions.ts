"use server";
// create-conversation.actions.ts
// Server action for creating conversations matching backend API

import type { ActorRef } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Conversation } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

export interface EncryptedKeyForUser {
  user_id: string;
  user_role: string;
  encrypted_key: string;
}

export interface CreateConversationPayload {
  participants: ActorRef[];  // Changed to ActorRef[]
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
    const response = await apiRequest<CreateConversationPayload, Conversation>("post", "/m-conversations", payload, {
      token: auth.token,
      schoolToken: auth.schoolToken
    });

    // const response = await fetch(`${API_BASE}/m-conversations`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${auth.token}`,
    //     ...(auth.schoolToken ? { "School-Token": auth.schoolToken } : {}),
    //   },
    //   body: JSON.stringify(payload),
    //   cache: "no-store",
    // });

    if (!response.data) {
      console.log("Conversation error 😥:",response)
      console.log("Payload 😁:",payload)
      throw new Error(
        response.message || `Failed to create conversation: ${response.statusCode}`
      );
    }

    return response.data;
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
      `${API_BASE}/m-users/public-keys?user_ids=${userIds.join(",")}`,
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

    const data = await response.json();

    // Check if some keys are missing
    if (data.missing_user_ids && data.missing_user_ids.length > 0) {
      console.warn(
        `Missing public keys for users: ${data.missing_user_ids.join(", ")}`
      );

      // Option 1: Throw error to prevent conversation creation
      throw new Error(
        `Cannot create encrypted conversation: ${data.missing_user_ids.length} user(s) haven't set up encryption yet. ` +
        `Please ask them to enable encryption in their settings.`
      );

      // Option 2: Return partial data and let caller decide
      // return {
      //   publicKeys: data.public_keys,
      //   missingUserIds: data.missing_user_ids,
      //   hasAllKeys: false
      // };
    }

    return {
      publicKeys: data.public_keys,
      missingUserIds: [],
      hasAllKeys: true
    };
  } catch (error) {
    console.error("Error getting public keys:", error);
    throw error;
  }
}
