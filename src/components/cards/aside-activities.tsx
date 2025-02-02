"use client";
import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { authUser } from "@/types/userModel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface props {
  lang: Locale;
  className?: string;
  user?: authUser;
}

const AsideActivities = ({ lang, className, user }: props) => {
  const pathname = usePathname();
  const theme = UseTheme();
  if (user?.role === "SCHOOLSTAFF")
    return (
      <div
        className={cn(
          " w-16 h-screen border-r fixed border-r-border p-2 space-y-2 bg-base-100",
          className
        )}
      >
        <Button
          shape="square"
          variant="ghost"
          className={cn(
            pathname === `/${lang}/school` &&
              (theme === "dark" ? "bg-white/10" : "bg-black/10")
          )}
        >
          <Link href={`/${lang}/school-staff`}>
            <MyImage src="/icons/dashboard.png" className=" size-8" />
          </Link>
        </Button>
        <Button
          shape="square"
          variant="ghost"
          className={cn(
            pathname === `/${lang}/messages` &&
              (theme === "dark" ? "bg-white/10" : "bg-black/10")
          )}
        >
          <Link href={`/${lang}/messages`}>
            <MyImage src="/icons/chat.png" className=" size-8" />
          </Link>
        </Button>
        <Button
          shape="square"
          variant="ghost"
          className={cn(
            pathname === `/${lang}/settings` &&
              (theme === "dark" ? "bg-white/10" : "bg-black/10")
          )}
        >
          <Link href={`/${lang}/settings`}>
            <MyImage src="/icons/cogwheel.png" className=" size-8" />
          </Link>
        </Button>
      </div>
    );
  return (
    <div
      className={cn(
        " w-16 h-screen border-r fixed border-r-border p-2 space-y-2 bg-base-100",
        className
      )}
    >
      <Button
        shape="square"
        variant="ghost"
        className={cn(
          pathname === `/${lang}/school` &&
            (theme === "dark" ? "bg-white/10" : "bg-black/10")
        )}
      >
        <Link href={`/${lang}/school`}>
          <MyImage src="/icons/school.png" className=" size-8" />
        </Link>
      </Button>
      <Button
        shape="square"
        variant="ghost"
        className={cn(
          pathname === `/${lang}/class` &&
            (theme === "dark" ? "bg-white/10" : "bg-black/10")
        )}
      >
        <Link href={`/${lang}/class`}>
          <MyImage src="/icons/blackboard.png" className=" size-8" />
        </Link>
      </Button>
      <Button
        shape="square"
        variant="ghost"
        className={cn(
          pathname === `/${lang}/notes` &&
            (theme === "dark" ? "bg-white/10" : "bg-black/10")
        )}
      >
        <Link href={`/${lang}/notes`}>
          <MyImage src="/icons/note.png" className=" size-8" />
        </Link>
      </Button>
      <Button
        shape="square"
        variant="ghost"
        className={cn(
          pathname === `/${lang}/messages` &&
            (theme === "dark" ? "bg-white/10" : "bg-black/10")
        )}
      >
        <Link href={`/${lang}/messages`}>
          <MyImage src="/icons/chat.png" className=" size-8" />
        </Link>
      </Button>
      <Button
        shape="square"
        variant="ghost"
        className={cn(
          pathname === `/${lang}/settings` &&
            (theme === "dark" ? "bg-white/10" : "bg-black/10")
        )}
      >
        <Link href={`/${lang}/settings`}>
          <MyImage src="/icons/cogwheel.png" className=" size-8" />
        </Link>
      </Button>
    </div>
  );
};

export default AsideActivities;
