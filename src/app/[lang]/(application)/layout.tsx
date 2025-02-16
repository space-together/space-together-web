import { auth } from "@/auth";
import OtherData1 from "@/components/site/navbar/app-aside-other-data1";
import AppFooter from "@/components/site/navbar/app-fotter";
import AppNavbar from "@/components/site/navbar/app-navbar";
import { AppSidebar } from "@/components/site/navbar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import { getStudentsByUserId } from "@/services/data/student-data";
import {
  adminSidebarGroups,
  schoolStaffSidebarGroups,
  studentSidebarGroups,
  teacherSidebarGroups,
} from "@/utils/context/app-side-content";
import { redirect } from "next/navigation";
 interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ApplicationLayout(props: props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const getStudents = await getStudentsByUserId(currentUser.id);
  const classCards = await Promise.all(
    getStudents.map((student) => {
      const { class: userClass } = student;
      return <OtherData1 userClass={userClass} lang={lang} key={student.id} />;
    })
  );
  return (
    <SidebarProvider className="">
      <AppNavbar
        user={{
          ...currentUser,
          name: currentUser.name ?? "",
          email: currentUser.email ?? undefined,
          image: currentUser.image ?? undefined,
        }}
        lang={lang}
      />
      <AppSidebar
        items={
          currentUser.role === "STUDENT"
            ? studentSidebarGroups
            : currentUser.role === "SCHOOLSTAFF"
            ? schoolStaffSidebarGroups
            : currentUser.role === "ADMIN"
            ? adminSidebarGroups
            : teacherSidebarGroups
        }
        otherData1={[classCards]}
        lang={lang}
      />
      <div className=" flex flex-col w-full">
        <main className=" pt-14 bg-base-200 w-full pb-4 min-h-screen">{children}</main>
        <AppFooter lang={lang}/>
      </div>
    </SidebarProvider>
  );
}
