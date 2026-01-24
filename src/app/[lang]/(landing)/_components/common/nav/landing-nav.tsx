import type { Locale } from "@/i18n";
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
  return (
    <nav className=" px-4 py-2 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <LandingNavLogo auth={auth} lang={lang} />
        <LandingNavList auth={auth} lang={lang} />
      </div>
      <div className=" flex flex-row items-center gap-4">
        <LadingNavSearchDialog auth={auth} lang={lang} />
        <LandingNavAuthButtons auth={auth} lang={lang} />
      </div>
    </nav>
  );
};

export default LandingNav;
