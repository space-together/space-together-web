import type { Locale } from "@/i18n";
import type { userRole } from "@/lib/schema/common-details-schema";

type RedirectContentsProps = {
  lang: Locale;
  role: userRole;
  id: string;
};

export const redirectContents = ({
  lang,
  role,
}: Omit<RedirectContentsProps, "id">) => {
  return `/${lang}/${
    role === "STUDENT"
      ? "s"
      : role === "SCHOOLSTAFF"
        ? "s-t"
        : role === "PARENT"
        ? "pr"
        : role === "ADMIN"
          ? "a"
          : "t"
  }`;
};

export const profileRedirects = ({ lang, role, id }: RedirectContentsProps) => {
  return `/${lang}/p/${role === "STUDENT" ? "s" : role === "TEACHER" ? "t" : "s-t"}/${id}`;
};
