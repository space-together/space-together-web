import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toLowerCase } from "@/utils/functions/characters";
import { Button } from "../ui/button";
import Link from "next/link";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import { TextTooltip } from "@/context/tooltip/text-tooltip";
import { cn } from "@/lib/utils";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface props {
  userRole:
    | "DIRECTER"
    | "EDUCATION_PREFECT"
    | "DISCIPLINE_PREFECT"
    | "TEACHER"
    | "STUDENT";
  lang: Locale;
  className?: string;
}
const UserCardSmallCallSetting = ({ userRole, lang, className }: props) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center happy-card flex-row w-full space-y-2",
        className
      )}
    >
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/student`}>
          <Avatar className=" size-14">
            <AvatarImage src="/images/2.jpg" />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <div className=" flex space-x-4 items-center">
            <Link href={`/${lang}/profile/student`}>
              <h4 className=" font-medium">Murekezi Hindiro</h4>
            </Link>
            <div className=" -space-x-2 flex items-center">
              <Dot size={32} />
              <span className=" text-sm font-medium ">Kinyarwanda</span>
            </div>
          </div>
          <div className=" flex items-center">
            <span className=" font-medium text-myGray capitalize">
              {toLowerCase(userRole)}
            </span>
            {userRole === "STUDENT" && (
              <div className=" flex -space-x-2 items-center">
                <Dot size={32} />
                <TextTooltip
                  content={<span>Level 5 Software development</span>}
                  trigger={<span>L5 SOD</span>}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" space-x-2">
        <Button variant="warning" size="sm">
          <IoIosRemoveCircleOutline />
          Disable
        </Button>
        <Button variant="error" size="sm">
          <CiCircleRemove />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default UserCardSmallCallSetting;
