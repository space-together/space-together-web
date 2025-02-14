import { Locale } from "@/i18n";
import { UserRole } from "../../../prisma/prisma/generated";

type RedirectContentsProps = {
  lang: Locale;
  role: UserRole;
}

export const RedirectContents = ({ lang, role }: RedirectContentsProps) => {
  return `/${lang}/${
    role === "STUDENT"
      ? "class"
      : role === "SCHOOLSTAFF"
      ? "school-staff"
      : role === "ADMIN"
      ? "admin"
      : "teacher"
  }`;
};
