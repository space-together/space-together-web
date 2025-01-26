import { auth } from "@/auth";
import { AppSidebar } from "@/components/site/navbar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import { adminSidebarGroups } from "@/utils/context/app-side-content";
import { redirect } from "next/navigation";
interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function Layout(props: props) {
  const params = await props.params;

  const { lang } = params;
  const { children } = props;

  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <SidebarProvider className=" gap-2 w-full">
      <AppSidebar
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
        items={adminSidebarGroups}
        name="Admin"
        lang={lang}
      />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
