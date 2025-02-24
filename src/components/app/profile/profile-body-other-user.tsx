import React from "react";
import ProfilePosts from "./profile-posts";
import { Locale } from "@/i18n";

interface props {
  lang: Locale;
}

const ProfileBodyOtherUser = ({ lang }: props) => {
  return (
    <div>
      <ProfilePosts lang={lang} />
    </div>
  );
};

export default ProfileBodyOtherUser;
