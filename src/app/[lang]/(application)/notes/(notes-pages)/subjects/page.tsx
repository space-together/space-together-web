import { auth } from '@/auth';
import SubjectCard from '@/components/cards/subject-card';
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
    <div className=' happy-page'>
      <h1 className='  happy-title-head'>Teachers Notes</h1>
      <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SubjectCard />
      </div>
    </div>
  )
}

export default NotesSubjectsPage
