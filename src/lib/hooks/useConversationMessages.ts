// useConversationMessages.ts
// Hook for managing conversation messages with encryption and real-time updates

import { useCallback, useEffect, useRef, useState } from "react";
import { getConversationKey, getConversationMessages, markConversationAsRead } from "../messaging/messaging.api";
import { decryptConversationKey, decryptMessage } from "../messaging/messaging.crypto";
import type { MessageSocketEvent } from "../messaging/messaging.socket";
import { messagingSocket } from "../messaging/messaging.socket";
import { getPrivateKey, getConversationKey as getStoredKey, storeConversationKey } from "../messaging/messaging.store";

interface Message {
  _id: string;
  conversation_id: string;
  sender_id: string;
  sender_username: string;
  sender_full_name: string;
  encrypted_payload: string;
  nonce: string;
  key_version: number;
  message_type: "TEXT" | "FILE";
  file_url?: string;
  file_public_id?: string;
  client_message_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  read_by?: string[];
}

interface DecryptedMessage extends Omit<Message, "encrypted_payload"> {
  content: string;
}

export function useConversationMessages(conversationId: string) {
  const [messages, setMessages] = useState<DecryptedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const symmetricKeyRef = useRef<CryptoKey | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize: fetch conversation key and decrypt it
  const initialize = useCallback(async () => {
    if (isInitializedRef.current) return;

    try {
      setIsLoading(true);
      setError(null);

      // Check if key already in IndexedDB
      let key = await getStoredKey(conversationId);

      if (!key) {
        // Fetch encrypted key from server
        const privateKeyPem = await getPrivateKey();
        if (!privateKeyPem) {
          throw new Error("Private key not found. Please log in again.");
        }

        const keyResponse = await getConversationKey(conversationId);
        
        // Decrypt conversation key
        key = await decryptConversationKey(
          keyResponse.encrypted_key_for_user,
          privateKeyPem
        );

        // Store in IndexedDB
        await storeConversationKey(conversationId, key, keyResponse.key_version);
      }

      symmetricKeyRef.current = key;
      isInitializedRef.current = true;

      // Fetch initial messages
      await fetchMessages(1);

      // Connect WebSocket
      messagingSocket.connectToConversation(conversationId);

      // Set up event handlers
      const unsubscribeCreated = messagingSocket.on("message_created", handleMessageCreated);
      const unsubscribeDeleted = messagingSocket.on("message_deleted", handleMessageDeleted);
      const unsubscribeRead = messagingSocket.on("message_read", handleMessageRead);

      // Mark as read
      markConversationAsRead(conversationId).catch(console.error);

      return () => {
        unsubscribeCreated();
        unsubscribeDeleted();
        unsubscribeRead();
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize conversation";
      setError(errorMessage);
      console.error("Conversation initialization error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  // Fetch messages from API
  const fetchMessages = async (pageNum: number) => {
    if (!symmetricKeyRef.current) return;

    try {
      const response = await getConversationMessages(conversationId, pageNum, 50);
      const encryptedMessages: Message[] = response.messages || [];

      // Decrypt messages
      const decrypted: DecryptedMessage[] = [];
      for (const msg of encryptedMessages) {
        if (msg.deleted_at) continue;

        try {
          const content = await decryptMessage(
            msg.encrypted_payload,
            msg.nonce,
            symmetricKeyRef.current
          );

          decrypted.push({
            ...msg,
            content,
          });
        } catch (err) {
          console.error(`Failed to decrypt message ${msg._id}:`, err);
        }
      }

      if (pageNum === 1) {
        setMessages(decrypted);
      } else {
        setMessages((prev) => [...decrypted, ...prev]);
      }

      setHasMore(encryptedMessages.length === 50);
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  // Handle new message from WebSocket
  const handleMessageCreated = useCallback(async (event: MessageSocketEvent) => {
    if (!symmetricKeyRef.current) return;

    try {
      const message: Message = event.data;

      // Decrypt
      const content = await decryptMessage(
        message.encrypted_payload,
        message.nonce,
        symmetricKeyRef.current
      );

      const decryptedMessage: DecryptedMessage = {
        ...message,
        content,
      };

      // Add to state if not duplicate
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) {
          return prev;
        }
        return [...prev, decryptedMessage];
      });

      // Mark as read
      markConversationAsRead(conversationId).catch(console.error);
    } catch (err) {
      console.error("Failed to handle new message:", err);
    }
  }, [conversationId]);

  // Handle message deleted
  const handleMessageDeleted = useCallback((event: MessageSocketEvent) => {
    const { message_id } = event.data;
    setMessages((prev) => prev.filter((m) => m._id !== message_id));
  }, []);

  // Handle message read
  const handleMessageRead = useCallback((event: MessageSocketEvent) => {
    const { message_id, user_id } = event.data;
    setMessages((prev) =>
      prev.map((m) =>
        m._id === message_id
          ? { ...m, read_by: [...(m.read_by || []), user_id] }
          : m
      )
    );
  }, []);

  // Load more messages (pagination)
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchMessages(page + 1);
    }
  }, [isLoading, hasMore, page]);

  // Add optimistic message
  const addOptimisticMessage = useCallback((message: DecryptedMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Remove failed message
  const removeMessage = useCallback((clientMessageId: string) => {
    setMessages((prev) => prev.filter((m) => m.client_message_id !== clientMessageId));
  }, []);

  useEffect(() => {
    initialize();

    return () => {
      messagingSocket.disconnect();
      isInitializedRef.current = false;
    };
  }, [initialize]);

  return {
    messages,
    isLoading,
    error,
    hasMore,
    loadMore,
    currentUserId,
    addOptimisticMessage,
    removeMessage,
  };
}
