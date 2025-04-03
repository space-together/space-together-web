import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getCurrentUser } from "@/services/auth/core/current-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create - school",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffCreateSchoolPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = await getCurrentUser({ withFullUser: true });
  if (!currentUser) return redirect(`/${lang}/auth/login`);
  if (currentUser.role !== "SCHOOLSTAFF") return <PermissionPage />;
  return <div> <PermissionPage /></div>;
};

export default SchoolStaffCreateSchoolPage;
