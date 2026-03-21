import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface LandingNavLogoProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const LandingNavLogo = ({ auth, lang }: LandingNavLogoProps) => {
  return (
    <MyLink
      href={auth ? `/${lang}/home` : `/${lang}`}
      className="flex items-center gap-2"
    >
      <MyImage
        src="/logo.svg"
        alt="Space-Together logo"
        className="relative size-10 shrink-0"
        priority
        loading="eager"
        classname="object-contain"
      />
      <h2 className="sr-only">space-together</h2>
    </MyLink>
  );
};

export default LandingNavLogo;
