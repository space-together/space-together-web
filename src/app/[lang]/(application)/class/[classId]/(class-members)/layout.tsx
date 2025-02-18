import { auth } from "@/auth";
import ClassNavbar from "@/components/app/class/navbar/class-navbar";
import NotFoundPage from "@/components/page/not-found-page";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getClassById, isUserInClass } from "@/services/data/class-data";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; classId: string }>;
}

export default async function ClassIdLayout(props: props) {
  const params = await props.params;
  const { lang, classId } = params;
  const { children } = props;
  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const getClass = await getClassById(classId);
  if (!getClass) return <NotFoundPage />
  const isClassMember = await isUserInClass(currentUser.id, classId);
  if (!isClassMember) return <PermissionPage />;
  return (
    <div>
      <ClassNavbar
        classId={classId}
        lang={lang}
        getClass={getClass}
        user={{
          ...currentUser,
          name: currentUser.name ?? "",
          email: currentUser.email ?? undefined,
          image: currentUser.image ?? undefined,
        }}
      />
      {children}
    </div>
  );
}
