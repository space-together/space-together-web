import MyImage from "@/components/my-components/myImage";
import { Dot } from "lucide-react";
import React from "react";
import { MdClass, MdOutlineSchool } from "react-icons/md";

const ClassAbout = () => {
  return (
    <div className=" happy-card space-y-2">
      <div className=" space-y-2">
        <div className=" flex gap-2 items-center">
          <MdClass />
          <h3 className=" font-semibold"> About class</h3>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          illum nihil provident voluptate laboriosam ipsam? Esse, vitae
          repudiandae, cumque sunt maiores repellat officiis quos ad, velit
          accusantium culpa reprehenderit exercitationem.
        </p>
      </div>
      <div>
        <div className=" flex space-x-2 items-center text-myGray">
          <MdOutlineSchool />
          <h4 className=" font-semibold">class Education</h4>
        </div>
        <div>
          <div className="flex  items-center -space-x-1">
            <Dot />
            <div className=" flex gap-2 items-center">
              <MyImage src={"/images/REB_Logo.png"} className="size-10 " />
              <span>REB</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" flex space-x-2 items-center text-myGray">
          <MdOutlineSchool />
          <h4 className=" font-semibold">Class Sector</h4>
        </div>
        <div>
          <div className="flex  items-center -space-x-1">
            <Dot />
            <div className=" flex gap-2 items-center">
              <span>Primary 1</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" flex space-x-2 items-center text-myGray">
          <MdOutlineSchool />
          <h4 className=" font-semibold">Class Lessons</h4>
        </div>
        <div>
          <div className="flex  items-center -space-x-1">
            <Dot />
            <div className=" flex gap-2 items-center">
              <span>Kinyarwanda</span>
            </div>
          </div>
          <div className="flex  items-center -space-x-1">
            <Dot />
            <div className=" flex gap-2 items-center">
              <span>Social studies</span>
            </div>
          </div>
          <div className="flex  items-center -space-x-1">
            <Dot />
            <div className=" flex gap-2 items-center">
              <span>Science</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAbout;
