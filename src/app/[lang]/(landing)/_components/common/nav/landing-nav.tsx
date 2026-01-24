import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import LandingNavList from "./landing-nav-list";
import LandingNavLogo from "./landing-nav-logo";

interface LandingNavProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const LandingNav = ({ auth, lang }: LandingNavProps) => {
  return (
    <nav className=" px-4 py-2">
      <div className="flex flex-row items-center gap-4">
        <LandingNavLogo auth={auth} lang={lang} />
        <LandingNavList auth={auth} lang={lang} />
      </div>
    </nav>
  );
};

export default LandingNav;
