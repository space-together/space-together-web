"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import AppLogo from "./app-logo";

interface AppNavLogoProps {
  auth: AuthContext;
  lang: Locale;
  isNav?: boolean;
}

const AppNavLogo = ({ auth, lang, isNav }: AppNavLogoProps) => {
  const { open } = useSidebar();

  // When navbar (isNav=true) → always normal
  if (isNav) {
    return (
      <div className="flex items-center space-x-2 ml-4">
        <SidebarTrigger className="" />
        <AppLogo lang={lang} auth={auth} />
      </div>
    );
  }

  // When NOT navbar (isNav=false) → depends on sidebar open/close
  return (
    <div className={cn("flex items-center space-x-2", open && "ml-2")}>
      <SidebarTrigger className="rounded-full" />

      {/* logo only shows when sidebar is open */}
      {open && <AppLogo lang={lang} auth={auth} />}
    </div>
  );
};

export default AppNavLogo;
