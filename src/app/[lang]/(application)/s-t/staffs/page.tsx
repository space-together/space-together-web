import DevelopingPage from "@/components/page/developing-page";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

const SchoolStaffs = async (props: PageProps<"/[lang]/s-t/staffs">) => {
  const prams = await props.params;
  const { lang } = prams;
  const auth = await authContext();

  if (!auth) redirect(`/${lang}/auth/login`);
  return <DevelopingPage role={auth.user.role} lang={lang as Locale} />;
};

export default SchoolStaffs;
