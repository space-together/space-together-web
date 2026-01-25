import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface HomePageComponentProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const HomePageComponent = ({ auth, lang }: HomePageComponentProps) => {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen"></div>
      Hello home Rw
      <div className="min-h-screen"></div>
    </div>
  );
};

export default HomePageComponent;
