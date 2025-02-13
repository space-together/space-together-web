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
import MessageUserCard from "@/components/cards/message-user-card";

interface props {
  lang: Locale;
}

const NavMessageDropDown = ({ lang }: props) => {
  const theme = UseTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" shape="circle">
          <MyImage className=" size-8" src="/icons/chat.png" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-96" data-theme={theme}>
        <DropdownMenuLabel>
          <h3 className=" happy-title-base">New messages</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {[...Array(3)].map((_, i) => (
          <MessageUserCard lang={lang} key={i} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavMessageDropDown;
