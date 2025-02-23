import { auth } from '@/auth';
import NotesBody from '@/components/app/notes/notes-body';
import NotesDetails from '@/components/app/notes/notes-details';
import NotesHeader from '@/components/app/notes/notes-header';
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';

interface props {
  params: Promise<{ lang: Locale }>;
}

const NotesIdPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=' min-h-screen'>
      <div className=" px-4">
        <NotesHeader lang={lang} />
        <NotesBody />
      </div>
      <NotesDetails />
    </div>
  )
}

export default NotesIdPage
