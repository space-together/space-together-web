"use client";

import AppNavClient from "@/components/page/application/navbar/app-nav-client";
import type { Locale } from "@/i18n";
import { useScrollPast } from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import LandingNavAuthButtons from "./landing-nav-auth-buttons";
import LandingNavList from "./landing-nav-list";
import LandingNavLogo from "./landing-nav-logo";
import LandingNavMobile from "./landing-nav-mobile";
import LadingNavSearchDialog from "./landing-nav-search-dialog";

interface LandingNavProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const LandingNav = ({ auth, lang }: LandingNavProps) => {
  const scrollPast = useScrollPast(24);
  return (
    <AppNavClient>
      <nav
        className={cn(
          "w-full border-b border-transparent px-4 py-2 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 md:px-8",
          scrollPast
            ? "border-base-content/10 bg-base-100/80 shadow-sm backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="relative mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-3">
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <LandingNavLogo auth={auth} lang={lang} />
          </div>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <LandingNavList auth={auth} lang={lang} />
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LadingNavSearchDialog auth={auth} lang={lang} />
            <div className="hidden sm:flex">
              <LandingNavAuthButtons auth={auth} lang={lang} />
            </div>
            <LandingNavMobile lang={lang} />
          </div>
        </div>
      </nav>
    </AppNavClient>
  );
};

export default LandingNav;
