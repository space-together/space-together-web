import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import Link from "next/link";
import { FaSignsPost } from "react-icons/fa6";
interface props {
  lang: Locale;
  onThePage?: boolean;
}

const ProfilePosts = ({ lang, onThePage }: props) => {
  return (
    <div className=" space-y-2">
      {!onThePage && (
        <div className=" space-x-1 flex items-center">
          <FaSignsPost />
          <h2 className=" font-semibold">Posts</h2>
        </div>
      )}
      <div className=" grid grid-cols-3 w-full gap-4">
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
        <PostCard lang={lang} postRole="IMAGE" />
      </div>
      {!onThePage && (
        <Link
          href={`/${lang}/profile/posts`}
          className=" happy-card justify-center items-center flex-row"
        >
          <span className=" link">See More</span>
        </Link>
      )}
    </div>
  );
};

export default ProfilePosts;
