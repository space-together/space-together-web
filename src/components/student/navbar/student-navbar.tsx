import { authUser } from "@/types/userModel";
import React from "react";

interface props {
  user: authUser;
}

const StudentNavbar = ({}: props) => {
  return (
    <ul className=" h-12 border-b border-border">
      <li>student navbar</li>
    </ul>
  );
};

export default StudentNavbar;
