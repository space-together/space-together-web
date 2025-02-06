
import { auth } from '@/auth';
import ClassHead from '@/components/app/class/classHead';
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';
import React from 'react'
import { Separator } from '@/components/ui/separator';
import ClassBody from '@/components/app/class/classBody';
import Progress from '@/components/app/teacher/teacher-class-progress';

interface props {
  params: Promise<{ lang: Locale }>;
}
const TeacherClassPage =async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className='p-4 '>
      <ClassHead lang={lang}/>
      <div className=" mt-28">
        <Separator />
        <div className="flex  space-x-4 mt-4">
          <ClassBody lang={lang}/>
          
          <div className="w-1/2">
          <Progress/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherClassPage
