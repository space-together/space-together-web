import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import Image from "next/image";

interface LandingNavLogoProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const LandingNavLogo = ({ auth, lang }: LandingNavLogoProps) => {
  return (
    <MyLink href={`/${lang}/${auth ? "/home" : ""}`}>
      <div className="relative size-10">
        <Image
          src={"/logo.svg"}
          className=" object-contain"
          priority
          loading="eager"
          alt="Application logo"
          fill
        />
      </div>
      <h2 className=" flex flex-row text-start text-lg font-semibold line-clamp-1">
        space-together
      </h2>
    </MyLink>
  );
};

export default LandingNavLogo;
