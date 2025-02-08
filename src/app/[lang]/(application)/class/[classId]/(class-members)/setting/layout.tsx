import { auth } from "@/auth";
import ClassSettingAside from "@/components/app/class/setting/class-setting-aside";
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
    <div className=" flex gap-4">
      <ClassSettingAside classId={classId} lang={lang}/>
      {children}
    </div>
  );
}
