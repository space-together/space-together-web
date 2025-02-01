import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
interface props {
  lang: Locale;
  className ?: string;
}

const MessagesAsideLeftNavbar = ({ lang, className }: props) => {
  return (
    <div className={cn(" w-16 h-screen border-r border-r-border p-2 space-y-4 bg-base-100" , className)}>
      <Button shape="square">
        <Link href={`/${lang}/school`}>
          <MyImage src="/icons/school.png" className=" size-8" />
        </Link>
      </Button>
      <Button shape="square">
        <Link href={`/${lang}/class`}>
          <MyImage src="/icons/blackboard.png" className=" size-8" />
        </Link>
      </Button>
      <Button shape="square">
        <Link href={`/${lang}/settings`}>
          <MyImage src="/icons/cogwheel.png" className=" size-8" />
        </Link>
      </Button>
    </div>
  );
};

export default MessagesAsideLeftNavbar;
