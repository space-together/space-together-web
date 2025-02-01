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
import NavMessageDropDownCard from "./nav-message-dropdown-card";

interface props {
  lang: Locale;
}

const NavMessageDropDown = ({lang}: props) => {
  const theme = UseTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" shape="circle">
          <MyImage className=" size-8" src="/icons/chat.png" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-72" data-theme={theme}>
        <DropdownMenuLabel>
          <h3 className=" happy-title-base">Messages</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NavMessageDropDownCard lang={lang}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavMessageDropDown;
