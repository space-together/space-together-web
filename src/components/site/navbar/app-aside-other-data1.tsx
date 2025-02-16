import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import Link from "next/link";

interface props {
  lang: Locale;
}

const OtherData1 = ({ lang }: props) => {
  return (
    <SidebarMenuSubItem>
      <Link
        href={`/${lang}/class/student`}
        className=" flex space-x-1 btn btn-ghost btn-sm mb-2 justify-start items-center"
      >
        <Avatar className=" size-6 space-x-2">
          <AvatarImage src="/images/1.jpg" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col items-start">
          <h5 className=" font-medium text-sm">Class names</h5>
        </div>
      </Link>
    </SidebarMenuSubItem>
  );
};

export default OtherData1;
