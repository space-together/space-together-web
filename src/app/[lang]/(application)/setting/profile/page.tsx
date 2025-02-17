import { auth } from '@/auth';
import UserUserDataForm from '@/components/form/update-user-data-form';
import { Separator } from '@/components/ui/separator';
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';
interface props {
  params: Promise<{ lang: Locale }>;
}
const SettingProfilePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=' happy-page p-4'>
      <h1 className=' happy-title-head'>Profile setting</h1>
      <Separator />
      <div>
        <h2 className=' happy-title-base'>General setting</h2>
        <UserUserDataForm />
      </div>
    </div>
  )
}

export default SettingProfilePage
