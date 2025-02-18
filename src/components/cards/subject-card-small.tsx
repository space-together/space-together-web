import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Class, Subject, User } from "../../../prisma/prisma/generated";
import Link from "next/link";
import { Button } from "../ui/button";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { authUser } from "@/types/userModel";

interface props {
  subject?: Subject | null;
  currentUser: authUser;
  getClass: Class;
  teacher?: User | null;
}

const SubjectCardSmall = ({
  subject,
  currentUser,
  getClass,
  teacher,
}: props) => {
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
            <span className=" font-medium text-sm">
              {!!teacher?.name ? teacher.name : "Hakizimana Jean"}
            </span>
            <Avatar className=" size-8">
              <AvatarImage
                src={!!teacher?.image ? teacher.image : "/profiles/b/20.png"}
              />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      {(currentUser.role === "ADMIN" ||
        currentUser.id === getClass?.userId) && (
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
      )}
      {!!teacher?.name ? "teacher": "no teacher"}
    </div>
  );
};

export default SubjectCardSmall;
