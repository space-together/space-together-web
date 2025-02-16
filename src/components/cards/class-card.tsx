 import MyImage from "../my-components/myImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { TextTooltip } from "@/context/tooltip/text-tooltip";
import { Class } from "../../../prisma/prisma/generated";
import { getUserById } from "@/services/data/user";
import { Button } from "../ui/button";

interface props {
  lang: Locale;
  isClassTeacher?: boolean;
  isSchool?: boolean;
  isOther?: boolean; // others users which are not in class
  isStudent?: boolean;
  myClass?: Class | null;
}

const ClassCard = async ({
  lang,
  isClassTeacher,
  isSchool,
  isOther,
  isStudent,
  myClass,
}: props) => {
  const getUser = myClass?.userId ? await getUserById(myClass.userId) : null;
  return (
    <div className=" happy-card p-0 relative h-auto">
      <div className=" relative">
        <MyImage
          src="/images/7.jpg"
          className=" w-full h-28"
          classname=" card rounded-b-none"
        />
        <Separator />
        <div className=" -bottom-20 p-4 flex items-center gap-2 absolute">
          <Avatar className=" size-20">
            <AvatarImage
              src={myClass?.symbol ? myClass.symbol : "/images/19.jpg"}
            />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className=" mt-6  space-x-1">
            <h3 className=" font-medium leading-5 line-clamp-3">
              {myClass?.name ?? "Level 5 Software development"}
            </h3>
            <Link
              className=" text-sm line-clamp-1 flex space-x-1"
              href={`/${lang}/class/${myClass?.id}`}
            >
              <span>@</span>{" "}
              <span className=" line-clamp-1">
                {myClass?.username ?? "L5SOD"}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 p-4">
        {/* class members */}
        <div className=" flex gap-2 ">
          <div className="  items-center -space-x-2 text-myGray flex">
            <Dot size={24} />
            <span className=" text-xs">
              32 <TextTooltip content={"Student"} trigger={<span className=" text-xs text-myGray">ST</span>} />
            </span>
          </div>
          <div className=" flex items-center -space-x-2 text-myGray">
            <Dot size={24} />
            <span className=" text-xs line">
              7 <TextTooltip content={"Teacher"} trigger={<span className=" text-xs text-myGray">TEA</span>} />
            </span>
          </div>
          <div className=" flex items-center -space-x-2 text-myGray">
            <Dot size={24} />
            <div className=" flex items-center space-x-2 text-sm">
              <Avatar className=" size-4">
                <AvatarImage
                  src={getUser?.image ? getUser.image : "/images/17.jpg"}
                />
                <AvatarFallback className=" text-sm">LOGO</AvatarFallback>
              </Avatar>
              {/* add link of class teacher */}
              <Link
                className={cn(
                  "line-clamp-1 link-hover",
                  isClassTeacher ? "text-myGray" : ""
                )}
                href={`/${lang}/profile/${
                  myClass?.userId ? myClass.userId : 1232
                }`}
              >
                <TextTooltip
                  content={"Class Teacher"}
                  trigger={
                    <span>{getUser?.username ? getUser.username : getUser?.name}</span>
                  }
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {!isStudent && (
        <div className=" px-4">
          <div className=" flex justify-between">
            <h5 className=" capitalize font-medium text-myGray">
              your lessons
            </h5>
            {isSchool && (
              <div className=" flex space-x-2 py-2">
                <Avatar className=" size-4">
                  <AvatarImage src="/images/19.jpg" />
                  <AvatarFallback className=" text-sm">LOGO</AvatarFallback>
                </Avatar>
                {/* TODO: add school link */}
                <Link
                  href={`/${lang}/school/student`}
                  className=" font-medium text-sm line-clamp-1 link-hover"
                >
                  SOSTHS
                </Link>
              </div>
            )}
          </div>
          <div className=" grid grid-cols-4 w-full">
            <div className=" flex items-center -space-x-2">
              <Dot size={32} />
              <span className=" text-sm line">Math</span>
            </div>
            <div className=" flex items-center -space-x-2">
              <Dot size={32} />
              <span className=" text-sm line">Kiny</span>
            </div>
            <div className=" flex items-center -space-x-2">
              <Dot size={32} />
              <span className=" text-sm line">Kisw</span>
            </div>
          </div>
        </div>
      )}
      <Separator />
      <div className=" p-4">
        {/* TODO: add link of class */}
        {isOther ? (
          <Link href={`/${lang}/class/student/about`} className=" btn w-full">
            About class
          </Link>
        ) : (
          <Link
            href={`/${lang}/class/${myClass?.id ? myClass.id : "student"}`}
          >
            <Button variant={isClassTeacher ? "info" : "primary"} className=" w-full">
            Join class
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
