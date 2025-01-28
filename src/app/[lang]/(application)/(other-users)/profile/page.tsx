import ProfileHeader from "@/components/app/profile/profile-header";
import { Locale } from "@/i18n";
import React from "react";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ProfilePage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" p-4">
      <ProfileHeader lang={lang} />
    </div>
  );
};

export default ProfilePage;
