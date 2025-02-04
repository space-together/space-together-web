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
    </div>
  )
}

export default ClassAboutPage
