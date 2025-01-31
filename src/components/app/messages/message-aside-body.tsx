"use client"
import MessageUserCard from "@/components/cards/message-user-card";
import { Locale } from "@/i18n";
import React from "react";

interface props {
  lang: Locale;
}

const MessageAsideBody = ({ lang }: props) => {
  const messageType = new URLSearchParams(window.location.search).get("type");
  return (
    <div className=" p-2 ">
      {messageType === "friends" ? (
        <div className="space-y-3">
          <MessageUserCard lang={lang} />
          <MessageUserCard lang={lang} />
          <MessageUserCard lang={lang} />
        </div>
      ) : (
        <div className="space-y-3">
          <MessageUserCard lang={lang} />
        </div>
      )}
    </div>
  );
};

export default MessageAsideBody;
