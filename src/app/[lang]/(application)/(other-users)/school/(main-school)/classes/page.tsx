import { auth } from '@/auth';
import SchoolClasses from '@/components/app/school/school-classese'
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';
import React from 'react'
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolClassesPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=' px-4 space-x-4 flex '>
      <SchoolClasses onThePage className=' grid-cols-3' lang={lang} />
    </div>
  )
}

export default SchoolClassesPage
