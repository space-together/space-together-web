import MyImage from "@/components/my-components/myImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TfiWorld } from "react-icons/tfi";
import { FaSchool, FaUserMinus } from "react-icons/fa6";
import { Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { Locale } from "@/i18n";

interface props {
  isMySchool?: boolean;
  lang: Locale;
  onThePage?: boolean;
}

const SchoolHeader = ({ isMySchool, lang, onThePage }: props) => {
  return (
    <div className=" space-y-2">
      {!onThePage && (
        <MyImage
          src="/images/8.jpg"
          className=" w-full h-80"
          classname=" card rounded-t-none"
        />
      )}
      <div className=" flex justify-between items-center">
        <div className=" flex space-x-2 items-center">
          <Avatar className=" size-32">
            <AvatarImage src="/images/19.jpg" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className=" space-y-1">
            <h1 className=" happy-title-head">School name</h1>
            <Link href={`/${lang}/school`} className=" link-hover">@ school_username</Link>
            <div>
              <div className=" text-sm text-myGray flex space-x-2 font-semibold items-center">
                <TfiWorld />
                <span>Public school</span>
              </div>
            </div>
            <div className=" flex -space-x-1 items-center text-myGray">
              <FaSchool />
              <div className=" flex items-center -space-x-2">
                <Dot size={32} />
                <div>Boarding school</div>
              </div>
              <div className=" flex items-center -space-x-2">
                <Dot size={32} />
                <div>Day school</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {!onThePage &&
            (!isMySchool ? (
              <Link href={`/${lang}/school/school-username/ask-to-join`}>
                <Button variant="info">
                  <FaUserPlus />
                  Ask Join school
                </Button>
              </Link>
            ) : (
              <Button variant="error">
                {" "}
                <FaUserMinus /> Left school
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolHeader;
