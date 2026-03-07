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

const AdminAuditLogsPage = async (
  props: PageProps<"/[lang]/a/audit-logs">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  // Check if user is ADMIN
  if (auth.user.role !== "ADMIN") {
    return (
      <PermissionPage
        lang={lang as Locale}
        role={auth.user.role}
        description="Only administrators can view audit logs"
      />
    );
  }

  return <AuditLogsClient auth={auth} lang={lang as Locale} />;
};

export default AdminAuditLogsPage;
