import { Locale } from "@/i18n";
import ProfilePosts from "./profile-posts";
import ProfileNotes from "./profile-notes";

interface props {
  lang: Locale;
}

const ProfileBody = ({ lang }: props) => {
  return (
    <div className=" w-full space-y-4">
      <ProfilePosts lang={lang}/>
      <ProfileNotes lang={lang}/>
    </div>
  );
};

export default ProfileBody;
