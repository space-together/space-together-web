"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import Link from "next/link";
import { Class } from "../../../../prisma/prisma/generated";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import UseTheme from "@/context/theme/use-theme";

interface props {
  lang: Locale;
  userClass: Class | null;
}

const OtherData1 = ({ lang, userClass }: props) => {
  const pathname = usePathname();
  const theme = UseTheme();
  return (
    <SidebarMenuSubItem className=" flex w-full">
        <Link
          href={`/${lang}/class/${userClass?.id ? userClass.id : "student"}`}
          className={cn(
            "items-center mb-1 btn btn-sm btn-ghost justify-start w-full flex-row",
            pathname === `/${lang}/class/${userClass?.id ? userClass.id : "student"}` &&
              `bg-base-300 ${
                theme === "dark" && "bg-white/10"
              }`
          )}
        >
          <div  className=" flex gap-2  text-start">
          <Avatar className=" size-6">
            <AvatarImage
              src={userClass?.symbol ? userClass.symbol : "/images/1.jpg"}
            />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <span className=" font-medium text-sm text-start line-clamp-1">
            {userClass?.name ? userClass.name : "Class names"}
          </span>
          </div>
        </Link>
    </SidebarMenuSubItem>
  );
};

export default OtherData1;
