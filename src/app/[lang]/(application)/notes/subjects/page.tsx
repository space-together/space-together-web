import { auth } from '@/auth';
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
  params: Promise<{ lang: Locale }>;
}

const NotesSubjectsPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) return redirect(`/${lang}/auth/login`);

  return (
    <div>
      notes subjects page
    </div>
  )
}

export default NotesSubjectsPage
