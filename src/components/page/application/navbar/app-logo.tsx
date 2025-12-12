import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import { redirectContents } from "@/lib/hooks/redirect";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import Image from "next/image";

interface props {
  name?: string;
  auth?: AuthContext;
  lang: Locale;
  className?: string;
  notShowName?: boolean;
}

const AppLogo = ({ name, auth, lang, notShowName = false }: props) => {
  return (
    <MyLink
      href={`${auth ? redirectContents({ lang, role: auth?.user.role || "STUDENT" }) : `/${lang}`}`}
      className="flex items-center gap-2"
    >
      <div className=" relative size-10">
      <Image src={"/logo.svg"} className=" object-contain" priority loading="eager"alt="Application logo" fill/>
      </div>
      <div className="flex flex-col">
        {!notShowName && (
          <h2
            className={cn(
              "logo-font flex flex-row text-start text-base font-semibold line-clamp-1",
            )}
          >
            space-together
          </h2>
        )}
        <span className="my-sm-text">{name}</span>
      </div>
    </MyLink>
  );
};

export default AppLogo;
