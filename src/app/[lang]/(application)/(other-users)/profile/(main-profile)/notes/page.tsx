import ProfileNotes from '@/components/app/profile/profile-notes';
import { Locale } from '@/i18n';
import React from 'react'
interface Props {
  params: Promise<{ lang: Locale }>;
}
const MainProfileNotesPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=' px-4'>
     <ProfileNotes onThePage lang={lang}/>
     <div className=' h-screen'></div>
    </div>
  )
}

export default MainProfileNotesPage
