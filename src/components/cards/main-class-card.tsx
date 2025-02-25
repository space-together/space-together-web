import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n";
import { ClassRoom } from "../../../prisma/prisma/generated";
import { Button } from "../ui/button";

interface props {
  lang: Locale;
  getClass?: ClassRoom | null;
}

const MainClassCard = async ({ lang, getClass }: props) => {
  return (
    <div className=" happy-card p-0 relative h-auto">
      <div className=" relative">
        <div className=" p-4 flex items-center gap-2">
          <Avatar className=" size-20">
            <AvatarImage
              src={getClass?.symbol ? getClass.symbol : "/images/19.jpg"}
            />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className=" space-x-1">
            <h3 className=" font-medium leading-5 line-clamp-3">
              {getClass?.name ?? "Level 5 Software development"}
            </h3>
            <Link
              className=" text-sm line-clamp-1 flex space-x-1"
              href={`/${lang}/class/${getClass?.id}`}
            >
              <span>@</span>{" "}
              <span className=" line-clamp-1">
                {getClass?.username ?? "L5SOD"}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* description of main class */}
      <div className="  text-sm line-clamp-2 px-4">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur error itaque neque esse delectus ad dolorum dolores facere, asperiores quaerat dolor maxime ex fugiat suscipit distinctio ut obcaecati sequi cum?</p>
      </div>
      <div className=" px-4">
        <div className=" flex justify-between">
          <h5 className=" capitalize font-medium text-myGray">Lessons</h5>
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
      <Separator />
      <div className=" p-4">
        <Link href={`/${lang}/notes/classes/1234`}>
          <Button variant={"info"} className=" w-full">
            Join main class
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainClassCard;
