"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";

interface props {
  lang: Locale;
  classId: string;
}

const ClassSettingAside = ({ lang, classId }: props) => {
  const pathname = usePathname();
  const theme = UseTheme()
  return (
    <aside className=" bg-base-100 w-52 h-screen border-r border-r-border space-y-2 py-2">
      <div className=" pr-2">
        <Link href={`/${lang}/class/${classId}/setting`}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(" font-medium w-full justify-start rounded-l-none", pathname === `/${lang}/class/${classId}/setting` &&
              `bg-base-300 ${
                theme === "dark" && "bg-white/10"
              }`)}
          >
            <AiOutlineSetting />
            General
          </Button>
        </Link>
      </div>
      <Separator />
      <div>

      </div>
    </aside>
  );
};

export default ClassSettingAside;
