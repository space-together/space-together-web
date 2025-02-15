import { auth } from "@/auth";
import SettingHeader from "@/components/app/settings/setting-header";
import SettingLang from "@/components/app/settings/setting-lang";
import SettingLinks from "@/components/app/settings/setting-links";
import SettingTheme from "@/components/app/settings/setting-theme";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}
const SettingPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div>
      <SettingHeader
        lang={lang}
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
      />
      <div className=" w-full px-4 flex space-x-4">
        <div className=" w-1/2">
          <SettingTheme />
        </div>
        <div className=" w-1/2 space-y-4">
        <SettingLang lang={lang}/>
          <SettingLinks lang={lang}/>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
