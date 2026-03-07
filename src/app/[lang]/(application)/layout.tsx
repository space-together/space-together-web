import AppBreadcrumb from "@/components/common/app-breadcrumb";
import AppFooter from "@/components/page/application/app-footer";
import AppLayoutClientBody from "@/components/page/application/app-layout-client-body";
import {
    adminSidebarGroups,
    parentSidebarGroups,
    schoolStaffSidebarGroups,
    studentSidebarGroups,
    teacherSidebarGroups,
} from "@/components/page/application/aside/app-side-content";
import { AppSidebar } from "@/components/page/application/aside/app-sidebar";
import AppNav from "@/components/page/application/navbar/app-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

export default async function ApplicationLayout(props: LayoutProps<"/[lang]">) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const role = auth.user.role;

  return (
    <SidebarProvider>
      <AppNav auth={auth} lang={lang as Locale} />
      <AppSidebar
        auth={auth}
        lang={lang as Locale}
        items={
          role === "STUDENT"
            ? studentSidebarGroups
            : role === "SCHOOLSTAFF"
              ? schoolStaffSidebarGroups
              : role === "ADMIN"
                ? adminSidebarGroups
                : role === "PARENT"
                  ? parentSidebarGroups
                  : teacherSidebarGroups
        }
      />
      <div className="bg-base-200 flex w-full flex-col">
        <AppLayoutClientBody lang={lang as Locale}>
          <div className=" relative">
            <AppBreadcrumb />
          </div>
          {children}
        </AppLayoutClientBody>
        <AppFooter lang={lang as Locale} />
      </div>
    </SidebarProvider>
  );
}
