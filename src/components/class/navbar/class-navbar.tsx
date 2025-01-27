"use client";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { authUser } from "@/types/userModel";
import { toLowerCase } from "@/utils/functions/characters";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface props {
  user: authUser;
  lang: Locale;
}

const ClassNavbar = ({ user, lang }: props) => {
  const pathname = usePathname();
  const role = toLowerCase(user.role);
  return (
    <div className=" h-10 border-b border-border w-full bg-base-100 pb-0 p-0 flex gap-2 px-2 pt-2">
      <Link
        href={`/${lang}/class/${role}`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-border p-2 cursor-pointer",
          pathname === `/${lang}/class/${role}` && "border-b-2 border-b-info"
        )}
      >
        Class room
      </Link>
      <Link
        href={`/${lang}/class/${role}/notes`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-border p-2 cursor-pointer",
          pathname === `/${lang}/class/${role}/notes` && "border-b-2 border-b-info"
        )}
      >
        Notes
      </Link>
      <Link
        href={`/${lang}/class/${role}/class-work`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-border p-2 cursor-pointer",
          pathname === `/${lang}/class/${role}/class-work` && "border-b-2 border-b-info"
        )}
      >
        class work
      </Link>
      <Link
        href={`/${lang}/class/${role}/classmate`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-border p-2 cursor-pointer",
          pathname === `/${lang}/class/${role}/classmate` && "border-b-2 border-b-info"
        )}
      >
        Classmate
      </Link>
      <Link
        href={`/${lang}/class/${role}/teachers`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-border p-2 cursor-pointer",
          pathname === `/${lang}/class/${role}/teachers` && "border-b-2 border-b-info"
        )}
      >
        Teachers
      </Link>
    </div>
  );
};

export default ClassNavbar;
