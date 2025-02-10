import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Subject } from "../../../prisma/prisma/generated";
import Link from "next/link";

interface props {
  subject?: Subject;
}

const SubjectCardSmall = ({ subject }: props) => {
  return (
    <div className=" happy-card flex w-full flex-row space-x-2 items-center">
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
        <span className=" font-medium text-sm">Hakizimana Jean</span>
      </div>
    </div>
  );
};

export default SubjectCardSmall;
