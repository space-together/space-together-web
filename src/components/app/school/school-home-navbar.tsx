"use client";
import { Button } from "@/components/ui/button";
import { RxActivityLog } from "react-icons/rx";
import { FaPeopleGroup, FaSignsPost } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa6";
// import { PiContactlessPayment } from "react-icons/pi";
import { MdClass } from "react-icons/md";
import { Locale } from "@/i18n";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface props {
  lang: Locale;
}

const SchoolHomeNav = ({ lang }: props) => {
  const pathname = usePathname();
  return (
    <nav className=" happy-card w-full">
      <div className=" flex space-x-2">
        <Link href={`/${lang}/school`}>
          <Button size="sm" className={cn(pathname === `/${lang}/school` && "text-info")}>
            <RxActivityLog />
            All
          </Button>
        </Link>
        <Link href={`/${lang}/school/about`}>
          <Button size="sm" className={cn(pathname === `/${lang}/school/about` && "text-info")}>
            <FaSchool />
            About school
          </Button>
        </Link>
        <Link href={`/${lang}/school/posts`}>
          <Button size="sm" className={cn(pathname === `/${lang}/school/posts` && "text-info")}>
            <FaSignsPost />
            Posts
          </Button>
        </Link>
        <Link href={`/${lang}/school/peoples`}>
          <Button size="sm" className={cn(pathname === `/${lang}/school/peoples` && "text-info")}>
            <FaPeopleGroup />
            Peoples
          </Button>
        </Link>
        <Link href={`/${lang}/school/classes`}>
          <Button size="sm" className={cn(pathname === `/${lang}/school/classes` && "text-info")}>
            <MdClass />
            Classes
          </Button>
        </Link>
        {/* <Link href={`/${lang}/school/announcement`}>
          <Button size="sm" className={cn(pathname === `/${lang}/school/announcement` && "text-info")}>
            <PiContactlessPayment />
            Announcement
          </Button>
        </Link> */}
      </div>
    </nav>
  );
};

export default SchoolHomeNav;
