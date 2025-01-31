import React from "react";
import MessagesAsideNavbar from "./message-aside-navbar";

const MessagesAside = () => {
  return (
    <aside className=" fixed w-80 h-screen bg-base-100">
      <MessagesAsideNavbar />
      <div className=" w-full border-r border-r-border">hello messages</div>
    </aside>
  );
};

export default MessagesAside;
