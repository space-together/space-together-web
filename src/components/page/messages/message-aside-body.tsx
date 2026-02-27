"use client";
// MessageAsideBody.tsx
// ---------------------
// Renders the grouped and direct message conversation entries inside the
// sidebar.  Each `MessageUserCard` is clickable and navigates to the
// corresponding conversation (`/${lang}/m/[conversationId]`).
//
// The backend must provide a payload containing conversation metadata
// (id, last message, timestamp, participants) which will eventually drive the
// props of `MessageUserCard`.  A websocket event should update this list when
// conversations or recent messages change.

import MessageUserCard from "@/components/cards/message-user-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Locale } from "@/i18n";

interface Props {
  lang: Locale;
}

const MessageAsideBody = ({ lang }: Props) => {
  return (
    <div className="p-2">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["group", "direct"]}
      >
        <AccordionItem value="group">
          <AccordionTrigger className=" font-normal text-sm py-2">
            Groups
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-0 text-balance pb-0 pt-0">
            <MessageUserCard messageCardType="group" lang={lang} />
            <MessageUserCard messageCardType="group" lang={lang} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="direct">
          <AccordionTrigger className=" font-normal text-sm  py-2">
            Direct messages
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-0 text-balance pb-0">
            <MessageUserCard lang={lang} />
            <MessageUserCard lang={lang} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MessageAsideBody;
