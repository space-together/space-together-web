"use client";
// MessageFooter.tsx
// ------------------
// Persistent footer component rendered at the bottom of a conversation page.
// Hosts `MessageInput` which handles rich text entry, mentions, emoji, and file
// attachments.  `onSend` should dispatch the new message to the backend via
// POST and/or websocket.  The backend is expected to broadcast the message to
// other participants over the realtime channel.

import MessageInput from "@/components/common/form/message-input/message-input";

const MessageFooter = () => {
  return (
    <div className=" px-2">
      <MessageInput
        classname=" min-h-10 "
        className="rounded-b-none border-b-0"
      />
    </div>
  );
};

export default MessageFooter;
