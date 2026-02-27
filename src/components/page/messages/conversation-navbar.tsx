"use client";
// ConversationNavbar.tsx
// -----------------------
// Shows the current conversation partner(s) and navigation tabs (Messages,
// Files).  The backend should supply participant info (name, role, avatar)
// when responding to the conversation metadata API.  Navbar links use `/m`
// prefix to stay inside the messaging section.

import MyAvatar from "@/components/common/image/my-avatar";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import Link from "next/link";

interface props {
  lang: Locale;
}

const ConversationNavbar = ({ lang }: props) => {
  return (
    <nav className=" bg-base-100 border-b border-b-base-300 px-4 py-2 flex justify-between items-center">
      <div className=" flex space-x-2 items-center">
        <MyAvatar size="xs" />
        <div className=" flex flex-col">
          <Link href={`/${lang}/profile/student`}>
            <h3 className=" font-medium leading-5"> Bruno Happy heart</h3>
          </Link>
          <span className=" text-base-content/50 text-xs">STUDENT</span>
        </div>
      </div>
      <div>
        <MyLink
          href={"/en/m/student"}
          loading
          button={{
            variant: "ghost",
            library: "daisy",
            size: "sm",
            role: "message",
          }}
          classname=" text-primary"
        >
          Messages
        </MyLink>
        <MyLink
          href={"/en/m/student/files"}
          loading
          button={{
            variant: "ghost",
            library: "daisy",
            size: "sm",
            role: "file",
          }}
        >
          Files
        </MyLink>
      </div>
    </nav>
  );
};

export default ConversationNavbar;
