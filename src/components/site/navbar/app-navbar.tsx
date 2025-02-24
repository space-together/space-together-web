"use client";
import SiteLogo from "./site-logo";
import { Locale } from "@/i18n";
import { authUser } from "@/types/userModel";
import NavProfileDropDown from "./nav-profile-drop-down";
import NavMessageDropDown from "./nav-messages-drop-down";
import { SidebarTrigger } from "@/components/ui/sidebar";
import NavNotificationDropDown from "./nav-notification-drop-down";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TextTooltip } from "@/context/tooltip/text-tooltip";

interface props {
  lang: Locale;
  user: authUser;
}

const AppNavbar = ({ lang, user }: props) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <nav className=" w-full h-14 max-h-14 fixed border-b border-base-300 p-2 flex justify-between z-50 bg-base-100">
      <div className=" flex space-x-2  items-center">
        <SidebarTrigger className=" size-12" />
        <TextTooltip
          trigger={
            <Button
              onClick={() => handleGoBack()}
              variant="ghost"
              shape="circle"
            >
              <ArrowLeft />
            </Button>
          }
          content={<span  className=" font-medium"> Go back</span>}
        />
        <SiteLogo user={user} lang={lang} />
      </div>
      <div className=" flex gap-2 items-center mr-4">
        <NavMessageDropDown lang={lang} />
        <div role="button" className=" btn btn-circle btn-ghost">
          <NavNotificationDropDown lang={lang} />
        </div>
        <NavProfileDropDown lang={lang} user={user} />
      </div>
    </nav>
  );
};

export default AppNavbar;
