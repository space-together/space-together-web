import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuditLogsClient from "./audit-logs-client";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Audit Logs",
    description: "View system audit logs and activity history",
  };
};

const SchoolStaffAuditLogsPage = async (
  props: PageProps<"/[lang]/s-t/audit-logs">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return <NotFoundPage message="You need to have school to view this page" />;
  }

  // Check if user is SCHOOLSTAFF
  if (auth.user.role !== "SCHOOLSTAFF") {
    return (
      <PermissionPage
        lang={lang as Locale}
        role={auth.user.role}
        description="Only school staff can view audit logs"
      />
    );
  }

  return <AuditLogsClient auth={auth} lang={lang as Locale} />;
};

export default SchoolStaffAuditLogsPage;
