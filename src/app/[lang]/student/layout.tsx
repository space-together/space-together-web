import { AppSidebar } from "@/components/site/navbar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { studentSidebarGroups } from "@/utils/context/app-side-content";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className=" gap-2 w-full">
      <AppSidebar name="Student" items={studentSidebarGroups} />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
