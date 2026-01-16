"use client";

import MessageInput from "@/components/common/form/message-input/message-input";
import { useState } from "react";

function TestingPage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // 1. Do something with the data (e.g., API call)
    console.log("Submitting message to database:", message);

    // 2. Clear the local state
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <div className="mt-80 w-[720px]">
        {" "}
        {/* Changed w-180 to a standard Tailwind width or hex */}
        <MessageInput
          className="bg-base-100 shadow-xl border border-base-300"
          value={message}
          onChange={(val) => setMessage(val)}
          onSend={handleSendMessage}
          placeholder="Write your message here..."
        />
        {/* Debugging: Previewing the output below the input */}
        <div className="mt-4 p-4 rounded bg-muted text-xs">
          <strong>State Preview (HTML):</strong>
          <code className="block mt-2">{message}</code>
        </div>
      </div>
    </div>
  );
}

export default TestingPage;
