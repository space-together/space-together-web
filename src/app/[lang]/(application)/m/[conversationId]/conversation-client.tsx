"use client";

// conversation-client.tsx
// Main client component for conversation page with encryption and WebSocket

import { decryptMessage } from "@/lib/crypto/decryptMessage";
import { getConversationKey } from "@/lib/crypto/keyStorage";
import type { DecryptedMessage } from "@/lib/messaging/types";
import { uploadFile } from "@/lib/messaging/uploadFile";
import { useConversationKey } from "@/lib/messaging/useConversationKey";
import { useMessages } from "@/lib/messaging/useMessages";
import { useSendMessage } from "@/lib/messaging/useSendMessage";
import { useWebSocket } from "@/lib/messaging/useWebSocket";
import { useParams } from "next/navigation";
import { useState } from "react";

interface ConversationClientProps {
  privateKeyPem?: string; // User's private key from secure storage
}

export default function ConversationClient({
  privateKeyPem,
}: ConversationClientProps) {
  const params = useParams();
  const conversationId = params.conversationId as string;

  // Fetch and store conversation key
  const { isLoading: keyLoading, error: keyError, hasKey } = useConversationKey({
    conversationId,
    privateKeyPem,
    enabled: !!conversationId,
  });

  // Fetch messages
  const {
    messages,
    isLoading: messagesLoading,
    error: messagesError,
    addMessage,
    removeMessage,
  } = useMessages({
    conversationId,
    enabled: hasKey,
  });

  // Send message hook
  const { sendMessage, isSending } = useSendMessage({
    conversationId,
    onSuccess: (message) => {
      // Optimistic update
      addMessage(message);
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
    },
  });

  // WebSocket connection
  const { isConnected } = useWebSocket({
    conversationId,
    enabled: hasKey,
    onMessageCreated: async (data) => {
      try {
        // Fetch and decrypt new message
        const key = await getConversationKey(conversationId);
        if (!key) return;

        const content = await decryptMessage(
          data.encrypted_payload,
          data.nonce,
          key
        );

        const decryptedMessage: DecryptedMessage = {
          ...data,
          content,
        };

        addMessage(decryptedMessage);
      } catch (error) {
        console.error("Failed to decrypt incoming message");
      }
    },
    onMessageDeleted: (data) => {
      removeMessage(data.message_id);
    },
  });

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    await sendMessage(content, "TEXT");
  };

  const handleSendFile = async (file: File) => {
    try {
      // Upload file
      const { url, public_id, original_filename } = await uploadFile(file);

      // Send file message with encrypted filename
      await sendMessage(original_filename, "FILE", url, public_id);
    } catch (error) {
      console.error("Failed to send file:", error);
    }
  };

  if (keyLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading conversation...</p>
      </div>
    );
  }

  if (keyError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-error mb-2">Failed to load conversation</p>
          <p className="text-sm">{keyError.message}</p>
        </div>
      </div>
    );
  }

  if (!hasKey) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Unable to access conversation key</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Connection status */}
      {!isConnected && (
        <div className="bg-warning/20 text-warning px-4 py-2 text-sm text-center">
          Reconnecting...
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messagesLoading ? (
          <div className="text-center">Loading messages...</div>
        ) : messagesError ? (
          <div className="text-center text-error">
            Failed to load messages: {messagesError.message}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-base-content/60">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))
        )}
      </div>

      {/* Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        isSending={isSending}
      />
    </div>
  );
}

// Message bubble component
function MessageBubble({ message }: { message: DecryptedMessage }) {
  const isFile = message.message_type === "FILE";

  return (
    <div className="flex flex-col">
      <div className="text-xs text-base-content/60 mb-1">
        {message.sender_full_name}
      </div>
      <div className="bg-base-200 rounded-lg p-3 max-w-md">
        {isFile ? (
          <a
            href={message.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            📎 {message.content}
          </a>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
      <div className="text-xs text-base-content/40 mt-1">
        {new Date(message.created_at).toLocaleTimeString()}
      </div>
    </div>
  );
}

// Message input component
function MessageInput({
  onSendMessage,
  onSendFile,
  isSending,
}: {
  onSendMessage: (content: string) => void;
  onSendFile: (file: File) => void;
  isSending: boolean;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSending) {
      onSendMessage(content);
      setContent("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendFile(file);
      e.target.value = ""; // Reset input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-base-300 p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          disabled={isSending}
        />
        <label className="btn btn-ghost">
          📎
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            disabled={isSending}
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!content.trim() || isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
