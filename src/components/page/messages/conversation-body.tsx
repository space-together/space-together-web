"use client";
// ConversationBody.tsx
// ----------------------
// Renders list of MessageCard components with real data from backend.
// Handles message decryption, pagination, and real-time updates.

import MessageCard from "@/components/cards/message-card";
import { useConversationMessages } from "@/lib/hooks/useConversationMessages";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const ConversationBody = () => {
  const params = useParams();
  const conversationId = params.conversationId as string;
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    error,
    hasMore,
    loadMore,
    currentUserId,
  } = useConversationMessages(conversationId);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Handle scroll for pagination
  const handleScroll = () => {
    if (!scrollRef.current || isLoading || !hasMore) return;

    if (scrollRef.current.scrollTop === 0) {
      loadMore();
    }
  };

  if (error) {
    return (
      <div className="px-2 py-4 text-center text-error">
        <p>Failed to load messages</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (isLoading && messages.length === 0) {
    return (
      <div className="px-2 py-4 text-center">
        <div className="loading loading-spinner loading-md"></div>
        <p className="mt-2 text-sm">Loading messages...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="px-2 py-4 text-center text-base-content/60">
        <p>No messages yet</p>
        <p className="text-sm">Start the conversation!</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="px-2 py-4 overflow-y-auto"
      onScroll={handleScroll}
    >
      {isLoading && hasMore && (
        <div className="text-center py-2">
          <div className="loading loading-spinner loading-sm"></div>
        </div>
      )}

      {messages.map((message) => (
        <MessageCard
          key={message._id}
          sender={message.sender_id === currentUserId}
          senderName={message.sender_full_name}
          content={message.content}
          timestamp={message.created_at}
          messageType={message.message_type}
          fileUrl={message.file_url}
          readBy={message.read_by}
        />
      ))}
    </div>
  );
};

export default ConversationBody;
