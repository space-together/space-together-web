import { auth } from '@/auth';
import ProfileBodyOtherUser from '@/components/app/profile/profile-body-other-user';
import ProfileHeader from '@/components/app/profile/profile-header'
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}
const ProfileIdPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" p-4 space-y-4 w-full">
      <ProfileHeader   user={{
          ...currentUser,
          name: currentUser.name ?? "",
          email: currentUser.email ?? undefined,
          image: currentUser.image ?? undefined,
        }} OtherUser lang={lang}/>
      <ProfileBodyOtherUser lang={lang}/>
    </div>
  )
}

export default ProfileIdPage
