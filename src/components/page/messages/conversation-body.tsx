// ConversationBody.tsx
// ----------------------
// Placeholder that renders a list of `MessageCard` components, each one
// representing a single message in the current conversation.  The real data
// should come from the backend via REST on initial load and then over the
// websocket channel for new messages or edits.

import MessageCard from "@/components/cards/message-card";

const ConversationBody = () => {
  return (
    <div className=" px-2 py-4">
      <MessageCard sender />
      <MessageCard sender />
      <MessageCard sender />
      <MessageCard />
      <MessageCard sender />
      <MessageCard />
      <MessageCard sender />
      <MessageCard sender />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard sender />
      <MessageCard sender />
    </div>
  );
};

export default ConversationBody;
