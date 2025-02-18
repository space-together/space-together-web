import { auth } from '@/auth';
import ClassCard from '@/components/cards/class-card'
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
  params: Promise<{ lang: Locale }>;
}

const NotesClassesPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) return redirect(`/${lang}/auth/login`);

  return (
    <div className=' happy-page'>
      <h1 className='  happy-title-head'>Classes Notes</h1>
      <div className=' grid grid-cols-3 gap-4'>
        {[...Array(5)].map((_, i) => (
          <ClassCard isStudent isNotes lang={lang} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default NotesClassesPage
