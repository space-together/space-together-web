import MessageCard from "@/components/cards/message-card";
import React from "react";

const ConversationBody = () => {
  return (
    <div className=" max-h-[80%] min-h-[80%] overflow-y-auto px-4">
      <MessageCard sender/>
      <MessageCard sender/>
      <MessageCard sender/>
      <MessageCard />
      <MessageCard sender/>
      <MessageCard />
      <MessageCard sender/>
      <MessageCard sender/>
      <MessageCard />
      <MessageCard sender/>
      <MessageCard sender/>
    </div>
  );
};

export default ConversationBody;
