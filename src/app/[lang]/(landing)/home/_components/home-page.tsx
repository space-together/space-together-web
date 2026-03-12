import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import HomeAccessSchool from "./home-access-school";
import HomeHero from "./home-hero";

interface HomePageComponentProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const HomePageComponent = ({ auth, lang }: HomePageComponentProps) => {
  return (
    <div className="min-h-screen space-y-8">
      <HomeHero auth={auth} lang={lang} />
      <HomeAccessSchool />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
};

export default HomePageComponent;
