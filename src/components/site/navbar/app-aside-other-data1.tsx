import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import Link from "next/link";
import { Class } from "../../../../prisma/prisma/generated";

interface props {
  lang: Locale;
  userClass: Class | null;
}

const OtherData1 = ({ lang, userClass }: props) => {
  return (
    <SidebarMenuSubItem className=" flex line-clamp-1 w-full">
      <Link
        href={`/${lang}/class/${userClass?.id ? userClass.id : "student"}`}
        className=" flex btn btn-ghost btn-sm mb-1 justify-start items-center w-full"
      >
        <Avatar className=" size-6 space-x-2">
          <AvatarImage
            src={userClass?.symbol ? userClass.symbol : "/images/1.jpg"}
          />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <span className=" font-medium text-sm">
          {userClass?.name ? userClass.name : "Class names"}
        </span>
      </Link>
    </SidebarMenuSubItem>
  );
};

export default OtherData1;
