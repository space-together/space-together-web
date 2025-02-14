import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface settingLinksProps {
  lang: Locale;
}

const SettingLinks = ({ lang }: settingLinksProps) => {
  return (
    <div className=" happy-card space-y-4">
      <h2 className=" happy-title-base">Settings</h2>
      <div className=" w-full">
        <Link href={`/${lang}/setting/privacy`}>
          <Button
            variant="ghost"
            size="sm"
            className=" justify-between w-full group"
          >
            <div className=" flex gap-2 items-center">
              <User />
              <span>Privacy</span>
            </div>
            <BsArrowRight
              size={16}
              className=" group-hover:scale-x-125 duration-150"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SettingLinks;
