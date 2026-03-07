// useSendMessage.ts
// Hook for sending encrypted messages with offline queue support

import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage as apiSendMessage } from "../messaging/messaging.api";
import { encryptMessage } from "../messaging/messaging.crypto";
import { messagingSocket } from "../messaging/messaging.socket";
import { getConversationKey } from "../messaging/messaging.store";

interface QueuedMessage {
  client_message_id: string;
  encrypted_payload: string;
  nonce: string;
  key_version: number;
  message_type: "TEXT" | "FILE";
  file_url?: string;
  file_public_id?: string;
  retryCount: number;
}

export function useSendMessage(conversationId: string) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const offlineQueueRef = useRef<QueuedMessage[]>([]);

  const sendMessage = useCallback(
    async (
      content: string,
      messageType: "TEXT" | "FILE" = "TEXT",
      fileUrl?: string,
      filePublicId?: string
    ) => {
      try {
        setIsSending(true);
        setError(null);

        // Get symmetric key
        const key = await getConversationKey(conversationId);
        if (!key) {
          throw new Error("Conversation key not found. Please reload the conversation.");
        }

        // Generate client message ID
        const clientMessageId = uuidv4();

        // Encrypt content
        const { encrypted_payload, nonce } = await encryptMessage(content, key);

        // Prepare payload
        const payload = {
          encrypted_payload,
          nonce,
          key_version: 1,
          message_type: messageType,
          file_url: fileUrl,
          file_public_id: filePublicId,
          client_message_id: clientMessageId,
        };

        // Try to send
        if (messagingSocket.isConnected()) {
          try {
            await apiSendMessage(conversationId, payload);
          } catch (err: any) {
            // Handle duplicate error gracefully
            if (err.status === 400 && err.code === "DUPLICATE_MESSAGE") {
              console.log("Duplicate message, ignoring");
              return;
            }

            // If offline, queue the message
            if (!navigator.onLine) {
              offlineQueueRef.current.push({
                ...payload,
                retryCount: 0,
              });
              throw new Error("You are offline. Message will be sent when connection is restored.");
            }

            throw err;
          }
        } else {
          // Queue for later if WebSocket disconnected
          offlineQueueRef.current.push({
            ...payload,
            retryCount: 0,
          });
          throw new Error("Connection lost. Message will be sent when reconnected.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to send message";
        setError(errorMessage);
        throw err;
      } finally {
        setIsSending(false);
      }
    },
    [conversationId]
  );

  // Process offline queue when connection restored
  const processOfflineQueue = useCallback(async () => {
    if (offlineQueueRef.current.length === 0) return;
    if (!messagingSocket.isConnected()) return;

    const queue = [...offlineQueueRef.current];
    offlineQueueRef.current = [];

    for (const message of queue) {
      try {
        await apiSendMessage(conversationId, message);
      } catch (err: any) {
        // If still failing and not duplicate, re-queue
        if (err.status !== 400 || err.code !== "DUPLICATE_MESSAGE") {
          if (message.retryCount < 3) {
            offlineQueueRef.current.push({
              ...message,
              retryCount: message.retryCount + 1,
            });
          }
        }
      }
    }
  }, [conversationId]);

  // Monitor connection status
  useState(() => {
    const checkConnection = setInterval(() => {
      if (messagingSocket.isConnected() && offlineQueueRef.current.length > 0) {
        processOfflineQueue();
      }
    }, 5000);

    return () => clearInterval(checkConnection);
  });

  return {
    sendMessage,
    isSending,
    error,
    queueLength: offlineQueueRef.current.length,
  };
}
