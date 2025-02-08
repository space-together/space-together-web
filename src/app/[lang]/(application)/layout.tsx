import { auth } from "@/auth";
import AppNavbar from "@/components/site/navbar/app-navbar";
import { AppSidebar } from "@/components/site/navbar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import {
  adminSidebarGroups,
  schoolStaffSidebarGroups,
  studentSidebarGroups,
  teacherSidebarGroups,
} from "@/utils/context/app-side-content";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ApplicationLayout(props: props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <SidebarProvider className="">
      <AppNavbar
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
        lang={lang}
      />
        <AppSidebar
          items={
            user.role === "STUDENT"
              ? studentSidebarGroups
              : user.role === "SCHOOLSTAFF"
              ? schoolStaffSidebarGroups
              : user.role === "ADMIN"
              ? adminSidebarGroups
              : teacherSidebarGroups
          }
          lang={lang}
        />
        <main className=" pt-14 bg-base-200 w-full">{children}</main>
    </SidebarProvider>
  );
}
