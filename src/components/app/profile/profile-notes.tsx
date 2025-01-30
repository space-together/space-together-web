import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import { BsFileEarmarkPost } from "react-icons/bs";

interface props {
  lang: Locale;
}
const ProfileNotes = ({lang} : props) => {
  return (
    <div className=" space-y-2">
    <div className=" space-x-1 flex items-center">
      <BsFileEarmarkPost />
      <h2 className=" font-semibold">Notes</h2>
    </div>
    <div className=" grid grid-cols-3 w-full gap-4">
      <PostCard lang={lang} postRole="NOTES" />
      <PostCard lang={lang} postRole="NOTES" />
      <PostCard lang={lang} postRole="NOTES" />
    </div>
  </div>
  )
}

export default ProfileNotes
