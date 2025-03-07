"use client";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { authUser } from "@/types/userModel";
import Link from "next/link";
import { usePathname } from "next/navigation";
 import { Class } from "../../../../../prisma/prisma/generated";

interface props {
  user: authUser;
  lang: Locale;
  getClass: Class;
  classId: string;
}

const ClassNavbar = ({ user, lang, classId, getClass }: props) => {
  const pathname = usePathname();

  return (
    <div className=" h-10 border-b border-base-300 w-full bg-base-100 pb-0 p-0 flex gap-2 px-2 pt-2">
      <Link
        href={`/${lang}/class/${classId}`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/class/${classId}` && "border-b-2 border-b-info"
        )}
      >
        Class room
      </Link>
      <Link
        href={`/${lang}/class/${classId}/notes`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/class/${classId}/notes` &&
            "border-b-2 border-b-info"
        )}
      >
        Notes
      </Link>
      <Link
        href={`/${lang}/class/${classId}/class-work`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/class/${classId}/class-work` &&
            "border-b-2 border-b-info"
        )}
      >
        Class work
      </Link>
      <Link
        href={`/${lang}/class/${classId}/people`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/class/${classId}/people` &&
            "border-b-2 border-b-info"
        )}
      >
        People
      </Link>
      <Link
        href={`/${lang}/class/${classId}/subjects`}
        className={cn(
          " h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
          pathname === `/${lang}/class/${classId}/subjects` &&
            "border-b-2 border-b-info"
        )}
      >
        Subjects
      </Link>
      {(user?.role === "ADMIN" || getClass?.user_id === user?.id) && (
        <Link
          href={`/${lang}/class/${classId}/setting`}
          className={cn(
            "h-8 flex justify-center items-center font-medium hover:bg-base-300 p-2 cursor-pointer",
            pathname === `/${lang}/class/${classId}/setting` &&
              "border-b-2 border-b-info"
          )}
        >
          Setting
        </Link>
      )}
    </div>
  );
};

export default ClassNavbar;
