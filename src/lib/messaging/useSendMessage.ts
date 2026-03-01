// useSendMessage.ts
// Hook for sending encrypted messages

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { encryptMessage } from "../crypto/encryptMessage";
import { getConversationKey } from "../crypto/keyStorage";
import type { DecryptedMessage, SendMessagePayload } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

interface SendMessageOptions {
  conversationId: string;
  onSuccess?: (message: DecryptedMessage) => void;
  onError?: (error: Error) => void;
}

export function useSendMessage({
  conversationId,
  onSuccess,
  onError,
}: SendMessageOptions) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = async (
    content: string,
    messageType: "TEXT" | "FILE" = "TEXT",
    fileUrl?: string,
    filePublicId?: string
  ) => {
    try {
      setIsSending(true);
      setError(null);

      // Get conversation key
      const key = await getConversationKey(conversationId);
      if (!key) {
        throw new Error("Conversation key not found. Please reload the conversation.");
      }

      // Generate client message ID
      const client_message_id = uuidv4();

      // Encrypt content
      const { encrypted_payload, nonce } = await encryptMessage(content, key);

      // Prepare payload
      const payload: SendMessagePayload = {
        encrypted_payload,
        nonce,
        key_version: 1,
        message_type: messageType,
        client_message_id,
      };

      if (messageType === "FILE" && fileUrl && filePublicId) {
        payload.file_url = fileUrl;
        payload.file_public_id = filePublicId;
      }

      // Send to server
      const res = await fetch(
        `${API_BASE}/m-conversations/${conversationId}/messages`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to send message: ${res.status}`
        );
      }

      const data = await res.json();
      const message = data.message;

      // Create decrypted message for optimistic UI
      const decryptedMessage: DecryptedMessage = {
        ...message,
        content,
      };

      onSuccess?.(decryptedMessage);

      return decryptedMessage;
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendMessage,
    isSending,
    error,
  };
}
