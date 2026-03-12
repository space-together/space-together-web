"use client";
import AppNavClient from "@/components/page/application/navbar/app-nav-client";
import type { Locale } from "@/i18n";
import { useScrollPast } from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import LandingNavAuthButtons from "./landing-nav-auth-buttons";
import LandingNavList from "./landing-nav-list";
import LandingNavLogo from "./landing-nav-logo";
import LadingNavSearchDialog from "./landing-nav-search-dialog";

interface LandingNavProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const LandingNav = ({ auth, lang }: LandingNavProps) => {
  const scrollPast = useScrollPast(100);
  return (
    <AppNavClient>
      <nav
        className={cn(
          "w-full px-8 py-2 flex flex-row items-center justify-between",
          scrollPast ? "bg-base-100 shadow-md py-1" : "bg-transparent",
        )}
      >
        <div className="flex flex-row items-center gap-4">
          <LandingNavLogo auth={auth} lang={lang} />
          <LandingNavList auth={auth} lang={lang} />
        </div>
        <div className=" flex flex-row items-center gap-4">
          <LadingNavSearchDialog auth={auth} lang={lang} />
          <LandingNavAuthButtons auth={auth} lang={lang} />
        </div>
      </nav>
    </AppNavClient>
  );
};

export default LandingNav;
