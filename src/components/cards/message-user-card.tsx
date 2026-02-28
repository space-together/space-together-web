"use client";
// MessageUserCard.tsx
// --------------------
// Represents a single conversation in the sidebar list.  Props include:
//  - `lang` – current locale used to build navigation links
//  - `messageCardType` – "group" or "direct"; determines avatar display
//
// Clicking anywhere on the card navigates to the conversation page at
// `/${lang}/m/[conversationId]`.  The backend should provide the following
// information per conversation:
//   * `_id` (used in link), `name`, `lastMessage`, `updatedAt`/`timestamp`, etc.
//   * avatars of participants for group chats.
//
// This component is purely presentational; real-time updates to its data are
// expected via a websocket subscription that the parent sidebar implements.

import MyAvatar from "@/components/common/image/my-avatar";
import MyAvatarGroup from "@/components/common/image/my-avatar-group";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface props {
  lang: Locale;
  messageCardType?: "group" | "direct";
  conversationId: string;
  name: string;
  profilePicture?: string;
  lastMessage?: string;
  unreadCount?: number;
}

const MessageUserCard = ({ 
  lang, 
  messageCardType = "direct",
  conversationId,
  name,
  profilePicture,
  lastMessage,
  unreadCount = 0
}: props) => {
  return (
    <div
      className={cn(
        "card flex w-full items-center flex-row space-x-1 p-1.5 px-2 duration-200",
        messageCardType === "group" && "items-center",
      )}
    >
      <MyLink href={`/${lang}/m/${conversationId}`}>
        {messageCardType === "direct" ? (
          <MyAvatar size="sm" src={profilePicture} />
        ) : (
          <div>
            <MyAvatarGroup
              items={[
                { src: "", alt: "" },
                { src: "", alt: "" },
                { src: "", alt: "" },
              ]}
              limit={1}
              size="xs"
            />
          </div>
        )}
      </MyLink>
      <div className="w-full gap-0 flex -space-y-0.5 flex-col">
        <Link
          href={`/${lang}/m/${conversationId}`}
          className="flex w-full items-center justify-between"
        >
          <h6 className="line-clamp-1 leading-6">{name}</h6>
          {unreadCount > 0 && (
            <span className="badge badge-primary badge-sm">{unreadCount}</span>
          )}
        </Link>
        <MyLink href={`/${lang}/m/${conversationId}`}>
          <p
            title={lastMessage || "No messages yet"}
            className="text-base-content/80 line-clamp-1 text-sm leading-4"
          >
            {lastMessage || "No messages yet"}
          </p>
        </MyLink>
      </div>
    </div>
  );
};

export default MessageUserCard;
