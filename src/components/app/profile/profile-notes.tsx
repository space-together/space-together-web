import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import Link from "next/link";
import { BsFileEarmarkPost } from "react-icons/bs";

interface props {
  lang: Locale;
  onThePage?: boolean;
}
const ProfileNotes = ({ lang, onThePage }: props) => {
  return (
    <div className=" space-y-2">
      {!onThePage && (
        <div className=" space-x-1 flex items-center">
          <BsFileEarmarkPost />
          <h2 className=" font-semibold">Notes</h2>
        </div>
      )}
      <div className=" grid grid-cols-3 w-full gap-4">
        <PostCard lang={lang} postRole="NOTES" />
        <PostCard lang={lang} postRole="NOTES" />
        <PostCard lang={lang} postRole="NOTES" />
      </div>
      {!onThePage && (
        <Link href={`/${lang}/profile/notes`} className=" happy-card justify-center items-center flex-row">
          <span className=" link">See More</span>
        </Link>
      )}
    </div>
  );
};

export default ProfileNotes;
