import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";
interface props {
  lang: Locale;
}

const MessagesAsideLeftNavbar = ({ lang }: props) => {
  return (
    <div className=" w-16 h-screen border-r border-r-border p-2 space-y-4">
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
