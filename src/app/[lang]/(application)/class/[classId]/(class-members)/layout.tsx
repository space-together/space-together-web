import { auth } from "@/auth";
import ClassNavbar from "@/components/app/class/navbar/class-navbar";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; classId: string }>;
}

export default async function ClassIdLayout(props: props) {
  const params = await props.params;
  const { lang, classId } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div>
      <ClassNavbar
      classId = {classId}
        lang={lang}
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
      />
      {children}
    </div>
  );
}
