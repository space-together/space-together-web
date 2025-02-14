"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { authUser } from "@/types/userModel";
import { logout } from "@/utils/service/logout";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { AiOutlineSetting } from "react-icons/ai";

interface props {
  user: authUser;
  lang: Locale;
}
const NavProfileDropDown = ({ user, lang }: props) => {
  const theme = UseTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" shape="circle">
          <Avatar className=" size-10  ">
            <AvatarImage src={user?.image ? user.image : "/images/2.jpg"} />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-72" data-theme={theme}>
        <DropdownMenuLabel className=" flex gap-2 items-center">
          <Avatar className=" size-8  ">
            <AvatarImage src={user?.image ? user.image : "/images/2.jpg"} />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <span className=" font-medium">{user.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" flex gap-2">
          <Link href={`/${lang}/profile`} className=" flex gap-2 w-full">
            <User />
            <span>Your Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className=" flex gap-2">
          <Link href={`/${lang}/setting`} className=" flex gap-2 w-full">
            <AiOutlineSetting />
            <span>Setting</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileDropDown;
