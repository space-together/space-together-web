import MyImage from "@/components/my-components/myImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";

const ClassHead = () => {
  return (
    <div className=" w-full relative">
      <MyImage
        src="/images/18.jpg"
        className=" w-full "
        classname="rounded-b-2xl"
      />
      <div className=" absolute z-10 -bottom-24 left-10 flex items-center space-x-2">
        <Avatar className=" size-36  ">
          <AvatarImage src="/images/17.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className=" mt-12">
          <h1 className=" text-2xl font-bold ">Level 5 Software Development</h1>
          <div className=" flex items-center space-x-2">
            <div className=" flex items-center space-x-2">
              <p className=" font-medium">@ L5SOD</p>
              <span className=" text-myGray font-medium">2024-2025</span>
            </div>
            <div className=" flex items-center -space-x-2 text-myGray">
              <Dot size={32} />
              <span>32 Student</span>
            </div>
            <div className=" flex items-center -space-x-2 text-myGray">
              <Dot size={32} />
              <span>7 Teacher</span>
            </div>
            <div className=" flex items-center -space-x-2 ">
              <Dot size={32} />
              <Avatar className=" size-8">
                <AvatarImage src="/images/2.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className=" pl-3"> Hakizimana Doe</span>
              <span className=" pl-4 text-myGray">CT</span>
            </div>
          </div>
          <div className=" flex items-center space-x-2">
            <Avatar className=" size-8">
              <AvatarImage src="/images/19.jpg" />
              <AvatarFallback>LOGO</AvatarFallback>
            </Avatar>
            <span>High Technical School</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassHead;
