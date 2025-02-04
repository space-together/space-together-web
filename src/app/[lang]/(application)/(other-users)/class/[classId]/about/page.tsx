import ClassAbout from '@/components/app/class/about/class-about';
import ClassHead from '@/components/app/class/classHead'
import { Locale } from '@/i18n';
import React from 'react'
interface Props {
  params: Promise<{ lang: Locale }>;
}

const ClassAboutPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div>
      <ClassHead lang={lang}/>
      <ClassAbout />
    </div>
  )
}

export default ClassAboutPage
