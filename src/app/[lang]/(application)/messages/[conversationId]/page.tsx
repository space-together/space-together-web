import ConversationBody from "@/components/app/messages/conversation-body";
import ConversationNavbar from "@/components/app/messages/conversation-navbar";
import MessageFooter from "@/components/app/messages/message-footer";
import React from "react";

const MessageConversationPage = () => {
  return (
    <div className=" h-[90vh] max-h-[90vh] overflow-y-auto min-h-[90vh] w-full relative">
      <ConversationNavbar />
      <ConversationBody />
      <MessageFooter />
    </div>
  );
};

export default MessageConversationPage;
