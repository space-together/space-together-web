import { auth } from "@/auth";
import SettingPrivacyBody from "@/components/app/settings/profile/setting-privacy-body";
import UserUserDataForm from "@/components/form/update-user-data-form";
import NotFoundPage from "@/components/page/not-found-page";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getUserById } from "@/services/data/user";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}
const SettingProfilePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const getCurrentUser = await getUserById(currentUser.id);
  if (!getCurrentUser) return <NotFoundPage />;
  return (
    <div className=" happy-page p-4">
      <h1 className=" happy-title-head">Profile setting</h1>
      <Separator />
      <div>
        <h2 className=" happy-title-base">General setting</h2>
        <UserUserDataForm currentUser={getCurrentUser} />
      </div>
      <Separator />
      <div>
        <h2 className=" happy-title-base">Privacy & Security</h2>
        <SettingPrivacyBody />
      </div>
    </div>
  );
};

export default SettingProfilePage;
