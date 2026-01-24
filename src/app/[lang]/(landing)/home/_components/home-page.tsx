import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface HomePageComponentProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const HomePageComponent = ({ auth, lang }: HomePageComponentProps) => {
  return <div className="min-h-screen">Hello home page</div>;
};

export default HomePageComponent;
