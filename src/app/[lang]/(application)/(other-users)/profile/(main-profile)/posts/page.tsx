import ProfilePosts from '@/components/app/profile/profile-posts'
import { Locale } from '@/i18n';
import React from 'react'

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ProfilePostPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=' px-4'>
      <ProfilePosts onThePage lang={lang}/>
      <div className=' h-screen'></div>
    </div>
  )
}

export default ProfilePostPage
