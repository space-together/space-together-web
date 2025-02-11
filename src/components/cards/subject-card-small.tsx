import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Subject } from "../../../prisma/prisma/generated";
import Link from "next/link";
import { Button } from "../ui/button";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { Dot } from "lucide-react";

interface props {
  subject?: Subject;
}

const SubjectCardSmall = ({ subject }: props) => {
  return (
    <div className=" happy-card flex w-full flex-row space-x-2 items-center justify-between">
      <div className=" flex space-x-2">
        <Link href={`/subject/${subject?.id ? subject.id : "123"}`}>
          <Avatar className=" size-12">
            <AvatarImage
              src={subject?.symbol ? subject.symbol : "/icons/book.png"}
            />
            <AvatarFallback>ICON</AvatarFallback>
          </Avatar>
        </Link>
        <div className=" -space-y-2">
          <h4 className=" font-medium ">
            {subject?.name ? subject.name : "Kinyarwanda"}
          </h4>
          <div className=" flex space-x-2 items-center">
            <span className=" font-medium text-sm">Hakizimana Jean</span>
            <div className=" flex -space-x-2 items-center">
              <Dot size={32} />
              <span className=" text-xs font-medium text-myGray">TEACHER</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" space-x-2">
        <Button size="sm">
          <AiOutlineSetting />
          Setting
        </Button>
        <Button variant="warning" size="sm">
          <IoIosRemoveCircleOutline />
          Disable
        </Button>
        <Button variant="error" size="sm">
          <CiCircleRemove />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default SubjectCardSmall;
