"use client";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  lang: Locale;
}

const NotesNavbar = ({ lang,}: props) => {
  const pathname = usePathname();

  return (
    <div className=" h-10 border-b border-base-300 w-full bg-base-100 pb-0 p-0 flex gap-2 px-2 pt-2">
      <Link
        href={`/${lang}/notes`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/notes` && "border-b-2 border-b-info"
        )}
      >
        classes
      </Link>
      <Link
        href={`/${lang}/notes/teachers`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/notes/teachers` &&
            "border-b-2 border-b-info"
        )}
      >
        Teachers
      </Link>
      <Link
        href={`/${lang}/notes/subjects`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/notes/subjects` &&
            "border-b-2 border-b-info"
        )}
      >
        Subjects
      </Link>
    </div>
  );
};

export default NotesNavbar;
