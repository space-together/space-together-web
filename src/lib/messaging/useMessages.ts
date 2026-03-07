// useMessages.ts
// Hook for fetching and managing messages in a conversation

import { useEffect, useState } from "react";
import { decryptMessage } from "../crypto/decryptMessage";
import { getConversationKey } from "../crypto/keyStorage";
import type { DecryptedMessage, Message } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

interface UseMessagesOptions {
  conversationId: string;
  enabled?: boolean;
}

export function useMessages({ conversationId, enabled = true }: UseMessagesOptions) {
  const [messages, setMessages] = useState<DecryptedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = async () => {
    if (!enabled || !conversationId) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${API_BASE}/m-conversations/${conversationId}/messages`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch messages: ${res.status}`);
      }

      const data = await res.json();
      const encryptedMessages: Message[] = data.messages || [];

      // Get conversation key
      const key = await getConversationKey(conversationId);
      if (!key) {
        throw new Error("Conversation key not found");
      }

      // Decrypt messages
      const decrypted: DecryptedMessage[] = [];
      for (const msg of encryptedMessages) {
        if (msg.deleted_at) {
          // Skip deleted messages
          continue;
        }

        try {
          const content = await decryptMessage(
            msg.encrypted_payload,
            msg.nonce,
            key
          );

          const msgWithRelations = msg as any; // Cast to access sender_user
          const senderFullName = msgWithRelations.sender_user?.full_name || "Unknown User";

          decrypted.push({
            ...msg,
            content,
            sender_full_name: senderFullName,
          } as DecryptedMessage);
        } catch (err) {
          console.error(`Failed to decrypt message ${msg._id}`);
        }
      }

      setMessages(decrypted);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId, enabled]);

  const addMessage = (message: DecryptedMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((m) => m._id !== messageId));
  };

  const updateMessage = (messageId: string, updates: Partial<DecryptedMessage>) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === messageId ? { ...m, ...updates } : m))
    );
  };

  return {
    messages,
    isLoading,
    error,
    refetch: fetchMessages,
    addMessage,
    removeMessage,
    updateMessage,
  };
}
