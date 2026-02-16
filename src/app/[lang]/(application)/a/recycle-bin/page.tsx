import RecycleBinTable from "@/components/page/backup/recycle-bin-table";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import type { DeletedEntity } from "@/lib/schema/backup-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Recycle Bin",
    description: "Recover deleted data",
  };
};

const RecycleBinPage = async (props: PageProps<"/[lang]/a/recycle-bin">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return <NotFoundPage message="You need to have school to view this page" />;
  }

  // Check if user is ADMIN
  if (auth.user.role !== "ADMIN") {
    return (
      <PermissionPage
        lang={lang as Locale}
        description="Only administrators can access the recycle bin"
        role={auth.user.role}
      />
    );
  }

  const [deleted_res] = await Promise.all([
    apiRequest<void, Paginated<DeletedEntity>>(
      "get",
      `/recycle-bin?limit=${LIMIT}`,
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
        total={deleted_res.data?.total}
        title="Recycle Bin"
        description="Recover soft-deleted entities."
      />
      <RecycleBinTable
        auth={auth}
        lang={lang as Locale}
        deletedEntities={deleted_res?.data?.data ?? []}
        total={deleted_res.data?.total ?? 0}
      />
    </div>
  );
};

export default RecycleBinPage;
