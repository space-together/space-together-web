import ProfileBody from "@/components/app/profile/profile-body";
import { Locale } from "@/i18n";
 
interface Props {
  params: Promise<{ lang: Locale }>;
}

const ProfilePage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" p-4 space-y-4 w-full">
      <ProfileBody lang={lang} />
      <div className=" h-screen"/>
    </div>
  );
};

export default ProfilePage;
