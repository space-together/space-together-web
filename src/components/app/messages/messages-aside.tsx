import React from "react";
import MessagesAsideNavbar from "./message-aside-navbar";
import MessageSearch from "./messages-search";

const MessagesAside = () => {
  return (
    <aside className=" fixed w-80 h-screen bg-base-100 flex">
      <MessagesAsideNavbar />
      <div className="w-full max-h-screen min-h-screen border-r border-r-border">
        <MessageSearch />
      </div>
    </aside>
  );
};

export default MessagesAside;
