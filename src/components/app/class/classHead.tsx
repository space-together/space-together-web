import MyImage from "@/components/my-components/myImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserTooltip from "@/context/tooltip/user-tooltip";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import { Class } from "../../../../prisma/prisma/generated";
import { authUser } from "@/types/userModel";
import { getUserById } from "@/services/data/user";

interface Props {
  lang: Locale;
  myClass?: Class;
  user?: authUser;
}

const ClassHead = async ({ lang, myClass, user }: Props) => {
  // Fetch user data if myClass.userId exists
  const getUser = myClass?.userId ? await getUserById(myClass.userId) : null;

  return (
    <div className="w-full relative">
      <MyImage src="/images/18.jpg" className="w-full" classname="rounded-b-2xl" />
      <div className="absolute z-10 -bottom-24 left-10 flex items-center space-x-2">
        <Avatar className="size-36">
          <AvatarImage src={myClass?.symbol || "/images/17.jpg"} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="mt-12">
          <h1 className="text-2xl font-bold">
            {myClass?.name || "Level 5 Software Development"}
          </h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <p className="font-medium">@ {myClass?.username || "L5SOD"}</p>
              {/* <span className="text-myGray font-medium">2024-2025</span> */}
            </div>
            {/* <div className="flex items-center -space-x-2 text-myGray">
              <Dot size={32} />
              <span>32 Student</span>
            </div>
            <div className="flex items-center -space-x-2 text-myGray">
              <Dot size={32} />
              <span>7 Teacher</span>
            </div> */}
            <div className="flex items-center -space-x-2">
              <Dot size={32} />
              <UserTooltip
                lang={lang}
                trigger={
                  <Avatar className="size-8">
                    <AvatarImage src={getUser?.image || "/images/2.jpg"} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                }
              />
              <span className="pl-3">{user?.name || "Hakizimana Doe"}</span>
              {/* <span className="pl-4 text-myGray">CT</span> */}
            </div>
          </div>
          {/* SCHOOL: add school */}
          {/* <div className="flex items-center space-x-2">
            <Avatar className="size-8">
              <AvatarImage src="/images/19.jpg" />
              <AvatarFallback>LOGO</AvatarFallback>
            </Avatar>
            <span>High Technical School</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ClassHead;