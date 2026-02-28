// useConversationsList.ts
// Hook for fetching and managing conversations list

import { realtimeClient } from "@/service/realtime-client";
import { useEffect, useState } from "react";
import { getConversationsAction } from "../messaging/conversations.actions";

interface Conversation {
  _id: string;
  participants: Array<{
    user_id: string;
    username: string;
    full_name: string;
    avatar?: string;
  }>;
  is_group: boolean;
  name?: string;
  last_message_preview?: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export function useConversationsList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConversations();

    // Subscribe to real-time updates
    const unsubscribe = realtimeClient.subscribe("conversation", (event) => {
      if (event.event_type === "created") {
        setConversations((prev) => [event.data, ...prev]);
      } else if (event.event_type === "updated") {
        setConversations((prev) =>
          prev.map((c) => (c._id === event.entity_id ? event.data : c))
        );
      } else if (event.event_type === "deleted") {
        setConversations((prev) => prev.filter((c) => c._id !== event.entity_id));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getConversationsAction(1, 50);
      setConversations(response.conversations || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load conversations";
      setError(errorMessage);
      console.error("Failed to fetch conversations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    conversations,
    isLoading,
    error,
    refetch: fetchConversations,
  };
}
