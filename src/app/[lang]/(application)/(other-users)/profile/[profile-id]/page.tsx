import ProfileBodyOtherUser from '@/components/app/profile/profile-body-other-user';
import ProfileHeader from '@/components/app/profile/profile-header'
import { Locale } from '@/i18n';
import React from 'react'
interface Props {
  params: Promise<{ lang: Locale }>;
}

const ProfileIdPage =  async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" p-4 space-y-4 w-full">
      <ProfileHeader OtherUser lang={lang}/>
      <ProfileBodyOtherUser lang={lang}/>
    </div>
  )
}

export default ProfileIdPage
