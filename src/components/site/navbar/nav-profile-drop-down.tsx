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
            <AvatarFallback>{user.role}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-72" data-theme={theme}>
        <DropdownMenuLabel className=" flex gap-2 items-center">
          <Avatar className=" size-8  ">
            <AvatarImage src={user?.image ? user.image : "/images/2.jpg"} />
            <AvatarFallback>{user.role}</AvatarFallback>
          </Avatar>
          <span className=" font-medium">{user.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/${lang}/profile`} className=" btn btn-ghost btn-sm">
            <User />
            <span>Your Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => logout()} variant="ghost" size="sm" className=" text-error">
            <LogOut />
            <span>Logout</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileDropDown;
