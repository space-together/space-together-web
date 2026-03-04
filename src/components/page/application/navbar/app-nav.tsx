import MyImage from "@/components/common/myImage";
import { Skeleton } from "@/components/ui/skeleton";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Suspense } from "react";
import AppNavClient from "./app-nav-client";
import AppNavLogo from "./app-nav-logo";
import NavMessageDropDown from "./nav-message-drop-down";
import NavProfileDropDown from "./nav-profile-drop-down";

interface AppNavProps {
  lang: Locale;
  auth: AuthContext;
}

const AppNav = async ({ lang, auth }: AppNavProps) => {
  return (
    <AppNavClient>
      <nav className="border-base-300 pl-0 bg-base-100  z-50 flex h-14 max-h-14 w-full justify-between border-b p-2 shadow-sm">
        <AppNavLogo isNav lang={lang} auth={auth} />
        <div className="mr-4 flex items-center gap-2">
          {/* <NavMessageDropDown lang={lang}/> */}
          <div className="btn btn-circle btn-ghost">
            <MyImage className="size-6" src="/icons/bell.png" />
          </div>
          <NavMessageDropDown />
          <Suspense fallback={<Skeleton className="size-8" />}>
            <NavProfileDropDown auth={auth} />
          </Suspense>
        </div>
      </nav>
    </AppNavClient>
  );
};

export default AppNav;
