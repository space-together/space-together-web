import React from "react";
import MessagesAsideLeftNavbar from "./message-aside-left-navbar";
import MessageSearch from "./messages-search";
import MessagesAsideNavbar from "./message-aside-navbar";
import MessageAsideBody from "./message-aside-body";
import { Locale } from "@/i18n";

interface props {
  lang: Locale;
}

const MessagesAside = ({ lang }: props) => {
  return (
    <aside className=" fixed w-80 h-screen bg-base-100 flex">
      <MessagesAsideLeftNavbar lang={lang} />
      <div className="w-full border-r border-r-border">
        <MessageSearch />
        <MessagesAsideNavbar lang={lang} />
        <div className=" max-h-[75vh] overflow-y-auto">
          <MessageAsideBody lang={lang} />
        </div>
        <div />
      </div>
    </aside>
  );
};

export default MessagesAside;
