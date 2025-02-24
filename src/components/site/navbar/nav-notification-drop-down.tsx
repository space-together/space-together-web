"use client";

import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";

interface props {
  lang: Locale;
}
const NavNotificationDropDown = ({  }: props) => {
  const theme = UseTheme();
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" shape="circle">
        <MyImage className=" size-8"  src="/icons/bell.png" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className=" w-72" data-theme={theme}>
      <DropdownMenuLabel>
        <h3 className=" happy-title-base">Notifications</h3>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      notifications
    </DropdownMenuContent>
  </DropdownMenu>
  );
};

export default NavNotificationDropDown;
