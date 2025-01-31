"use client";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface props {
  lang: Locale;
}
const MessagesAsideNavbar = ({ lang }: props) => {
  const pathname = usePathname();
  return (
    <div className=" border-b border-b-border px-2 flex  space-x-4">
      <div
        className={cn(
          "h-8 pt-1 ",
          pathname === `/${lang}/messages` && "border-b-2 border-b-info"
        )}
      >
        <Link href={`/${lang}/messages`}>Friends</Link>
      </div>
      <div  className={cn(
          "h-8 pt-1 ",
          pathname === `/${lang}/messages/requests` && "border-b-2 border-b-info"
        )}>
        <Link href={`/${lang}/messages/requests`}>Requests</Link>
      </div>
    </div>
  );
};

export default MessagesAsideNavbar;
