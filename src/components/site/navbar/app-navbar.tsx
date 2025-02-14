"use client";
import SiteLogo from "./site-logo";
import { Locale } from "@/i18n";
import { authUser } from "@/types/userModel";
import NavProfileDropDown from "./nav-profile-drop-down";
import NavMessageDropDown from "./nav-messages-drop-down";
import { SidebarTrigger } from "@/components/ui/sidebar";
import NavNotificationDropDown from "./nav-notification-drop-down";

interface props {
  lang: Locale;
  user: authUser;
}

const AppNavbar = ({ lang, user }: props) => {
  return (
    <nav className=" w-full h-14 max-h-14 fixed border-b border-border p-2 flex justify-between z-50 bg-base-100">
      <div className=" flex space-x-2  items-center">
        <SidebarTrigger className=" size-12"/>
        <SiteLogo user={user} lang={lang}/>
      </div>
      <div className=" flex gap-2 items-center mr-4">
        <NavMessageDropDown lang={lang}/>
        <div role="button" className=" btn btn-circle btn-ghost">
          <NavNotificationDropDown lang={lang}/>
        </div>
        <NavProfileDropDown lang={lang} user={user} />
      </div>
    </nav>
  );
};

export default AppNavbar;
