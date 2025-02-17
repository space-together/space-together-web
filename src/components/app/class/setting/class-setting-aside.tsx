"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";
import { LiaUsersSolid } from "react-icons/lia";

interface props {
  lang: Locale;
  classId: string;
}

const ClassSettingAside = ({ lang, classId }: props) => {
  const pathname = usePathname();
  const theme = UseTheme();
  return (
    <aside className=" bg-base-100 w-52 h-screen border-r border-r-base-300 space-y-2 py-2">
      <div className=" pr-2">
        <Link href={`/${lang}/class/${classId}/setting`}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              " font-medium w-full justify-start rounded-l-none",
              pathname === `/${lang}/class/${classId}/setting` &&
                `bg-base-300 ${theme === "dark" && "bg-white/10"}`
            )}
          >
            <AiOutlineSetting />
            General
          </Button>
        </Link>
      </div>
      <Separator />
      <div className=" space-y-1 pr-2">
        <Link href={`/${lang}/class/${classId}/setting/people`}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              " font-medium w-full justify-start rounded-l-none",
              pathname === `/${lang}/class/${classId}/setting/people` &&
                `bg-base-300 ${theme === "dark" && "bg-white/10"}`
            )}
          >
            <LiaUsersSolid size={20} />
            People
          </Button>
        </Link>
        <Link href={`/${lang}/class/${classId}/setting/subjects`}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              " font-medium w-full justify-start rounded-l-none",
              pathname === `/${lang}/class/${classId}/setting/subjects` &&
                `bg-base-300 ${theme === "dark" && "bg-white/10"}`
            )}
          >
            <FaBook />
            Subjects
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default ClassSettingAside;
