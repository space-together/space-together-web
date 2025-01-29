import { Button } from "@/components/ui/button";
import { RxActivityLog } from "react-icons/rx";
import React from "react";
import { FaPeopleGroup, FaSignsPost } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa6";
import { PiContactlessPayment } from "react-icons/pi";

const SchoolHomeNav = () => {
  return (
    <nav className=" happy-card w-full">
      <div className=" flex space-x-2">
      <Button className=" text-info">
        <RxActivityLog />
        Activities
      </Button>
      <Button>
        <FaSchool />
        About school
      </Button>
      <Button>
        <FaPeopleGroup />
        Peoples
      </Button>
      <Button>
        <FaSignsPost />
        Posts
      </Button>
      <Button>
        <PiContactlessPayment />
        Announcement
      </Button>
      </div>
    </nav>
  );
};

export default SchoolHomeNav;
