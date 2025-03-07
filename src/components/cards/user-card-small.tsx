 import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toLowerCase } from "@/utils/functions/characters";
import { Button } from "../ui/button";
import { LuMessageCircle } from "react-icons/lu";
import Link from "next/link";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import { TextTooltip } from "@/context/tooltip/text-tooltip";
import { cn } from "@/lib/utils";

interface props {
  userRole:
    | "DIRECTER"
    | "EDUCATION_PREFECT"
    | "DISCIPLINE_PREFECT"
    | "TEACHER"
    | "STUDENT";
  lang: Locale;
  className ?:  string;
}

const UserCardSmall = ({ userRole, lang,className }: props) => {
  
  return (
    <div className={cn("flex justify-between items-center  space-y-2", className)}>
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/student`}>
          <Avatar className=" size-12">
            <AvatarImage src="/profiles/b/20.png" />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/${lang}/profile/student`}>
            <h4 className=" font-medium">Murekezi Hindiro</h4>
          </Link>
          <div className=" flex items-center">
            <span className=" font-medium text-myGray capitalize">
              {toLowerCase(userRole)}
            </span>
            {userRole === "STUDENT" && (
              <div className=" flex -space-x-2 items-center">
                <Dot size={32} />
                <TextTooltip content={<span>Level 5 Software development</span>} trigger={<span>L5 SOD</span>}/>
              </div>
            )}
          </div>
        </div>
      </div>
      <Link href={`/${lang}/messages/12334`}>
        <Button variant="info" size="sm">
          <LuMessageCircle />
          Message
        </Button>
      </Link>
    </div>
  );
};

export default UserCardSmall;
