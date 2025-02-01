import { auth } from '@/auth';
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';
import React from 'react'
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
    <div>
      notes page
    </div>
  )
}

export default NotesIdPage
