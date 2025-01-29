import MyImage from "@/components/my-components/myImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TfiWorld } from "react-icons/tfi";
import { FaSchool } from "react-icons/fa6";
import { Dot } from "lucide-react";

const SchoolHeader = () => {
  return (
    <div className=" space-y-2">
      <MyImage
        src="/images/8.jpg"
        className=" w-full h-80"
        classname=" card rounded-t-none"
      />
      <div className=" flex space-x-2 items-center">
        <Avatar className=" size-32">
          <AvatarImage src="/images/19.jpg" />
          <AvatarFallback>LOGO</AvatarFallback>
        </Avatar>
        <div className=" space-y-1">
          <h3 className=" font-semibold text-2xl">School name</h3>
          <span>@ school_username</span>
          <div>
            <div className=" text-sm text-myGray flex space-x-2 font-semibold items-center">
              <TfiWorld />
              <span>Public school</span>
            </div>
          </div>
          <div className=" flex -space-x-1 items-center text-myGray">
            <FaSchool />
            <div className=" flex items-center -space-x-2">
              <Dot size={32}/>
              <div>Boarding school</div>
            </div>
            <div className=" flex items-center -space-x-2">
              <Dot size={32}/>
              <div>Day school</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolHeader;
