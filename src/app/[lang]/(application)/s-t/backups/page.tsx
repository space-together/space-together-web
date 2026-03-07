import BackupsTable from "@/components/page/backup/backups-table";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import type { SchoolBackup } from "@/lib/schema/backup-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Backup History",
    description: "View school backup history",
  };
};

const SchoolStaffBackupsPage = async (
  props: PageProps<"/[lang]/s-t/backups">,
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
        description="Only school staff can access backup history"
        role={auth.user.role}
      />
    );
  }

  const [backups_res] = await Promise.all([
    apiRequest<void, Paginated<SchoolBackup>>(
      "get",
      `/backups/others?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  return (
    <div className="space-y-4">
      <AppPageHeader
        total={backups_res.data?.total}
        title="Backup History"
        description="View school backup history (read-only)."
      />
      <BackupsTable
        auth={auth}
        lang={lang as Locale}
        backups={backups_res?.data?.data ?? []}
        total={backups_res.data?.total ?? 0}
        readOnly
      />
    </div>
  );
};

export default SchoolStaffBackupsPage;
