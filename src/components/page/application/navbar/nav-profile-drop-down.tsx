"use client";

import { UserSmCard } from "@/components/cards/user-card";
import MyAvatar from "@/components/common/image/my-avatar";
import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { type AuthContext, logout } from "@/lib/utils/auth-context";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { HiOutlineCog6Tooth } from "react-icons/hi2";

interface props {
  auth: AuthContext;
  lang: Locale;
}

const NavProfileDropDown = ({ auth, lang }: props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button library="daisy" variant="ghost" shape="circle">
          <MyAvatar
            size="sm"
            src={auth.user.image}
            alt={auth.user.name}
            type="cycle"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-base-100 flex flex-col gap-2">
        <div className=" flex flex-col gap-4">
          <UserSmCard
            name={auth.user.name}
            image={auth.user.image}
            role={auth.user.role}
            // avatarProps={{ type: "cycle", size: "sm" }}
            link={`/${lang}/p`}
          />
          {auth.school && (
            <MyLink href={`/${lang}/school`}>
              {auth.school?.logo && (
                <MyAvatar
                  src={auth.school.logo}
                  alt={auth.school.name}
                  size="2xs"
                />
              )}
              {auth.school?.name && <span>{auth.school.name}</span>}
            </MyLink>
          )}
        </div>
        <Separator />
        <Link href={`/p/${auth.user.username}`}>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <User size={16} />
            <span>Your Profile</span>
          </Button>
        </Link>
        <Link href={`/setting`}>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <HiOutlineCog6Tooth size={16} />
            <span>Settings</span>
          </Button>
        </Link>
        <Separator />
        <Button
          onClick={() => logout()}
          type="button"
          variant="ghost"
          size="sm"
          className="hover:text-error w-full cursor-pointer justify-start hover:bg-error/20"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NavProfileDropDown;
