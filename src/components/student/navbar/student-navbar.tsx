import { authUser } from "@/types/userModel";
import React from "react";

interface props {
  user: authUser;
}

const StudentNavbar = ({}: props) => {
  return (
    <ul className=" h-10 border-b border-border w-full bg-base-100">
      <li>student navbar</li>
    </ul>
  );
};

export default StudentNavbar;
