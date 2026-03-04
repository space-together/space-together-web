import MyImage from "@/components/common/myImage";
import AppLogo from "@/components/page/application/navbar/app-logo";
import NavMessageDropDown from "@/components/page/application/navbar/nav-message-drop-down";
import NavProfileDropDown from "@/components/page/application/navbar/nav-profile-drop-down";
import { Skeleton } from "@/components/ui/skeleton";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { Suspense } from "react";

const TestNewNavbar = async (props: PageProps<"/[lang]/test/navbar">) => {
  const auth = await authContext();
  const { lang } = await props.params;

  if (!auth) return <div>Error of auth</div>;
  return (
    <div className=" min-h-screen">
      <header className="border-base-300 bg-base-100  z-50  border-b p-2 shadow-sm flex flex-col gap-1">
        <nav className="flex max-h-14 w-full justify-between ">
          {/*<AppNavLogo isNav lang={lang} auth={auth} />*/}
          <AppLogo lang={lang as Locale} auth={auth} />
          <div className="mr-4 flex items-center gap-2">
            {/* <NavMessageDropDown lang={lang}/> */}
            <div className="btn btn-circle btn-ghost">
              <MyImage className="size-6" src="/icons/bell.png" />
            </div>
            <NavMessageDropDown />
            <Suspense fallback={<Skeleton className="size-8" />}>
              <NavProfileDropDown auth={auth} />
            </Suspense>
          </div>
        </nav>
        <main>application</main>
      </header>
    </div>
  );
};

export default TestNewNavbar;
