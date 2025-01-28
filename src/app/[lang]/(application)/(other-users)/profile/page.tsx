import ProfileHeader from "@/components/app/profile/profile-header";
import ProfileNavBar from "@/components/app/profile/profile-navbar";
import { Locale } from "@/i18n";
import React from "react";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ProfilePage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" p-4 space-y-2">
      <ProfileHeader lang={lang} />
      <ProfileNavBar />
      <div className=" h-screen"/>
    </div>
  );
};

export default ProfilePage;
