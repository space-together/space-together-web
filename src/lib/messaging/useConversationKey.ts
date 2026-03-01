// useConversationKey.ts
// Hook for fetching and decrypting conversation key

import { useEffect, useState } from "react";
import { decryptConversationKey } from "../crypto/decryptConversationKey";
import { getConversationKey, storeConversationKey } from "../crypto/keyStorage";
import type { ConversationKeyResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4646";

interface UseConversationKeyOptions {
  conversationId: string;
  privateKeyPem?: string; // User's private key (from secure storage)
  enabled?: boolean;
}

export function useConversationKey({
  conversationId,
  privateKeyPem,
  enabled = true,
}: UseConversationKeyOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (!enabled || !conversationId) {
      setIsLoading(false);
      return;
    }

    const fetchAndStoreKey = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if key already exists in IndexedDB
        const existingKey = await getConversationKey(conversationId);
        if (existingKey) {
          setHasKey(true);
          setIsLoading(false);
          return;
        }

        // Fetch encrypted key from server
        const res = await fetch(
          `${API_BASE}/m-conversations/${conversationId}/key`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("You are not a participant in this conversation");
          }
          throw new Error(`Failed to fetch conversation key: ${res.status}`);
        }

        const data: ConversationKeyResponse = await res.json();

        // Decrypt the key
        if (!privateKeyPem) {
          throw new Error("Private key not available");
        }

        const symmetricKey = await decryptConversationKey(
          data.encrypted_key_for_user,
          privateKeyPem
        );

        // Store in IndexedDB
        await storeConversationKey(
          conversationId,
          symmetricKey,
          data.key_version
        );

        setHasKey(true);
      } catch (err) {
        setError(err as Error);
        setHasKey(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndStoreKey();
  }, [conversationId, privateKeyPem, enabled]);

  return {
    isLoading,
    error,
    hasKey,
  };
}
