"use client";
// MessageAsideBody.tsx
// Real conversation list with data from backend

import MessageUserCard from "@/components/cards/message-user-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Locale } from "@/i18n";
import { useConversationsList } from "@/lib/hooks/useConversationsList";

interface Props {
  lang: Locale;
}

const MessageAsideBody = ({ lang }: Props) => {
  const { conversations, isLoading, error } = useConversationsList();

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-error">
        <p className="text-sm font-semibold">Failed to load conversations</p>
        <p className="text-xs mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-sm btn-primary mt-4"
        >
          Reload Page
        </button>
      </div>
    );
  }

  const groupConversations = conversations.filter((c) => c.is_group);
  const directConversations = conversations.filter((c) => !c.is_group);

  return (
    <div className="p-2">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["group", "direct"]}
      >
        <AccordionItem value="group">
          <AccordionTrigger className=" font-normal text-sm py-2">
            Groups ({groupConversations.length})
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-0 text-balance pb-0 pt-0">
            {groupConversations.length === 0 ? (
              <p className="text-sm text-base-content/60 p-2">No groups</p>
            ) : (
              groupConversations.map((conv) => (
                <MessageUserCard
                  key={conv._id}
                  messageCardType="group"
                  lang={lang}
                  conversationId={conv._id}
                  name={conv.name || "Group Chat"}
                  lastMessage={conv.last_message_preview}
                  unreadCount={conv.unread_count}
                />
              ))
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="direct">
          <AccordionTrigger className=" font-normal text-sm  py-2">
            Direct messages ({directConversations.length})
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-0 text-balance pb-0">
            {directConversations.length === 0 ? (
              <p className="text-sm text-base-content/60 p-2">No direct messages</p>
            ) : (
              directConversations.map((conv) => (
                <MessageUserCard
                  key={conv._id}
                  lang={lang}
                  conversationId={conv._id}
                  name={conv.participants[0]?.full_name || "Unknown"}
                  lastMessage={conv.last_message_preview}
                  unreadCount={conv.unread_count}
                />
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MessageAsideBody;
