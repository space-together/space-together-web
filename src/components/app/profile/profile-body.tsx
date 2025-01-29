import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaSignsPost } from "react-icons/fa6";

interface props {
  lang: Locale;
}

const ProfileBody = ({ lang }: props) => {
  return (
    <div className=" w-full space-y-4">
      <div className=" space-y-2">
        <div className=" space-x-1 flex items-center">
          <FaSignsPost />
          <h2 className=" font-semibold">Posts</h2>
        </div>
        <div className=" grid grid-cols-3 w-full gap-4">
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="IMAGE" />
        </div>
        <div className=" happy-card justify-center items-center flex-row">
          <span className=" link">See More</span>
        </div>
      </div>
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
    </div>
  );
};

export default ProfileBody;
