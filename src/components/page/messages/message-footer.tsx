"use client";
// MessageFooter.tsx
// ------------------
// Persistent footer component with message input and send logic.
// Handles encryption before sending messages.

import MessageInput from "@/components/common/form/message-input/message-input";
import { useSendMessage } from "@/lib/hooks/useSendMessage";
import { useParams } from "next/navigation";
import { useState } from "react";

const MessageFooter = () => {
  const params = useParams();
  const conversationId = params.conversationId as string;
  const [content, setContent] = useState("");

  const { sendMessage, isSending } = useSendMessage(conversationId);

  const handleSend = async () => {
    if (!content.trim() || isSending) return;

    // Strip HTML tags for plaintext
    const plainText = content.replace(/<[^>]*>/g, "").trim();
    if (!plainText) return;

    try {
      await sendMessage(plainText, "TEXT");
      setContent(""); // Clear input after successful send
    } catch (error) {
      console.error("Failed to send message:", error);
      // Error handling is done in the hook
    }
  };

  return (
    <div className="px-2">
      <MessageInput
        value={content}
        onChange={setContent}
        onSend={handleSend}
        disabled={isSending}
        classname="min-h-10"
        className="rounded-b-none border-b-0"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default MessageFooter;
