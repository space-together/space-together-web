import { auth } from "@/auth";
import { AppSidebar } from "@/components/site/navbar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import { studentSidebarGroups, teacherSidebarGroups } from "@/utils/context/app-side-content";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function StudentLayout(props: props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  

  return (
    <SidebarProvider className=" w-full">
      <AppSidebar
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
        lang={lang}
        items={ user.role === "STUDENT" ? studentSidebarGroups : teacherSidebarGroups}
      />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
