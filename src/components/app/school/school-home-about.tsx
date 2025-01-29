import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";
import React from "react";
import { FaSchool } from "react-icons/fa6";
import { MdOutlineSchool, MdSchool } from "react-icons/md";

const SchoolHomeAbout = () => {
  return (
    <div className=" w-1/2 happy-card space-y-4">
      <div className=" space-y-1">
        <div className=" flex space-x-2 items-center">
          <FaSchool /> <h3 className=" font-semibold">About School</h3>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          consequatur sequi suscipit quo corrupti laboriosam maxime sapiente
          animi quod. Maiores eos fuga ea error. Quas sit aperiam nulla!
          Voluptatem, tenetur
        </p>
      </div>
      <div className=" space-y-4">
        {/* school education */}
        <div className=" space-y-1">
          <div className=" flex space-x-2 items-center">
            <MdSchool /> <h4 className=" font-semibold">School Education</h4>
          </div>
          <div className=" space-y-2">
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <Avatar className=" size-8">
                  <AvatarImage src="/images/logortb.jpg" />
                  <AvatarFallback>LOGO</AvatarFallback>
                </Avatar>
                <h6 className=" font-medium">TVET</h6>
              </div>
            </div>
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <Avatar className=" size-8">
                  <AvatarImage src="/images/REB_Logo.png" />
                  <AvatarFallback>LOGO</AvatarFallback>
                </Avatar>
                <h6 className=" font-medium">REB</h6>
              </div>
            </div>
          </div>
        </div>
        {/* schooling */}
        <div className=" space-y-1">
          <div className=" flex space-x-2 items-center">
            <MdOutlineSchool /> <h4 className=" font-semibold">Schooling</h4>
          </div>
          <div className=" space-y-2">
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <h6 className=" font-medium">Boarding</h6>
              </div>
            </div>
            <div className=" flex -space-x-1 items-center">
              <Dot size={32} />
              <div className=" flex space-x-2 items-center">
                <h6 className=" font-medium">Days</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolHomeAbout;
