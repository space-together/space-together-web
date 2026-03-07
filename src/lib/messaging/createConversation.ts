// createConversation.ts
// Utility for creating new conversations with encrypted keys

import { encryptConversationKey } from "../crypto/encryptConversationKey";
import { generateConversationKey } from "../crypto/generateKey";
import { storeConversationKey } from "../crypto/keyStorage";
import type { Conversation, CreateConversationPayload } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

interface CreateConversationOptions {
  participants: Array<{ id: string; role: "STUDENT" | "ADMIN" | "TEACHER" | "SCHOOLSTAFF" | "PARENT" }>; // ActorRef objects
  isGroup: boolean;
  name?: string;
  participantPublicKeys: Record<string, string>; // userId -> publicKeyPem
}

export async function createConversation({
  participants,
  isGroup,
  name,
  participantPublicKeys,
}: CreateConversationOptions): Promise<Conversation> {
  try {
    // Generate symmetric key for conversation
    const symmetricKey = await generateConversationKey();

    // Encrypt key for each participant
    const encrypted_keys = await Promise.all(
      participants.map(async (participant) => {
        const publicKey = participantPublicKeys[participant.id];
        if (!publicKey) {
          throw new Error(`Public key not found for user ${participant.id}`);
        }

        const encrypted_key = await encryptConversationKey(
          symmetricKey,
          publicKey
        );

        return {
          user_id: participant.id,
          user_role: participant.role,
          encrypted_key,
        };
      })
    );

    // Prepare payload
    const payload: CreateConversationPayload = {
      participants,
      is_group: isGroup,
      encrypted_keys,
    };

    if (isGroup && name) {
      payload.name = name;
    }

    // Send to server
    const res = await fetch(`${API_BASE}/m-conversations`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create conversation: ${res.status}`
      );
    }

    const data = await res.json();
    const conversation: Conversation = data.conversation;

    // Store symmetric key locally
    await storeConversationKey(conversation._id, symmetricKey, 1);

    return conversation;
  } catch (error) {
    console.error("Failed to create conversation");
    throw error;
  }
}
