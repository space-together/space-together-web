import { Locale } from "@/i18n";
import { authUser } from "@/types/userModel";
import MyImage from "@/components/my-components/myImage";
import { toLowerCase } from "@/utils/functions/characters";
import Link from "next/link";

interface props {
  lang: Locale;
  user: authUser;
}
const SettingHeader = ({ user, lang }: props) => {
  return (
    <div className=" m-4 flex justify-between">
      <div className=" flex gap-2 items-center">
        <MyImage
          role="AVATAR"
          className=" size-40"
          src={!!user?.image ? user.image : "/profiles/b/20.png"}
        />
        <div className=" flex flex-col space-y-1">
          <div>
            <h4 className=" text-lg font-semibold">{user.name}</h4>
          </div>
          <div>
            <span>username:</span>
            <span className=" text-sm to-myGray">
              @{" "}
              {!!user?.username ? (
                user.username
              ) : (
                <span className=" text-warning">No username</span>
              )}
            </span>
          </div>
          <div>
            <span>Role :</span>{" "}
            <span className=" text-sm font-semibold capitalize">
              {toLowerCase(user.role)}
            </span>
          </div>
          <div>
            <span>Email :</span>{" "}
            <span className=" text-sm font-semibold ">{user.email}</span>
          </div>
          <Link href={`/${lang}/settings/profile`}></Link>
        </div>
      </div>
      <div>
        {/* TODO: add links which explain about user activities */}
      </div>
    </div>
  );
};

export default SettingHeader;
