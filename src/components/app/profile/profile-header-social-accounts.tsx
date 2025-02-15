import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
 
const ProfileHeaderSocialAccount = () => {
  return (
    <div className=" space-y-2">
      <h6 className=" font-medium underline">Social accounts</h6>
      <div className=" grid grid-cols-2 gap-2">
        <Link href={`/profile`} className=" flex gap-2">
          <MyImage className=" size-5" src="/icons/telephone.png" />
          <span >+250792537274</span>
        </Link>
        <Link href={`/profile`} className=" flex gap-2">
          <MyImage className=" size-5" src="/icons/whatsapp.png" />
          <span >+250792537274</span>
        </Link>
        <Link href={`/profile`} className=" flex gap-2">
          <MyImage className=" size-5" src="/icons/instagram.png" />
          <span >hakorima__</span>
        </Link>
        <Link href={`/profile`} className=" flex gap-2">
          <MyImage className=" size-5" src="/icons/facebook.png" />
          <span >hakorima Happy</span>
        </Link>
        <Link href={`/profile`} className=" flex gap-2">
          <MyImage className=" size-5" src="/icons/youtube.png" />
          <span >hakorima Happy</span>
        </Link>
        <Button variant="ghost" size="sm" className=" ">
            See others
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeaderSocialAccount;
