import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
interface props {
  lang: Locale;
}

const MessagesAsideLeftNavbar = ({ lang }: props) => {
  return (
    <div className=" w-16 h-screen border-r border-r-border p-2 space-y-4">
      <Link href={`/${lang}/school`}>
        <Button shape="square">
          <MyImage src="/icons/school.png" className=" size-8"/>
        </Button>
      </Link>
      <Button shape="square">
      <MyImage src="/icons/blackboard.png" className=" size-8"/>
      </Button>
      <Button shape="square">
        <AiOutlineSetting size={24} />
      </Button>
    </div>
  );
};

export default MessagesAsideLeftNavbar;
