import React from "react";
import MessagesAsideLeftNavbar from "./message-aside-left-navbar";
import MessageSearch from "./messages-search";
import MessagesAsideNavbar from "./message-aside-navbar";

const MessagesAside = () => {
  return (
    <aside className=" fixed w-80 h-screen bg-base-100 flex">
      <MessagesAsideLeftNavbar />
      <div className="w-full border-r border-r-border">
        <MessageSearch />
        <MessagesAsideNavbar />
      </div>
    </aside>
  );
};

export default MessagesAside;
