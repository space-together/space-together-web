import MyAvatar from "@/components/common/image/my-avatar";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import { BsMailbox, BsPerson, BsPhone } from "react-icons/bs";

interface TeacherProfileHeaderProps {
  teacher?: Teacher;
  lang: Locale;
}

const TeacherProfileHeader = ({ teacher }: TeacherProfileHeaderProps) => {
  return (
    <section className="flex items-center gap-4">
      <MyAvatar size="2xl" src={teacher?.image} alt={teacher?.name} />
      <div className=" flex flex-col gap-2 items-start w-full">
        <div className=" flex flex-row justify-between items-center w-full">
          <div className=" flex gap-2 items-center">
            <h4 className="h4">{teacher?.name}</h4>
            <h5 className="text-base-content/50 flex  items-center">
              <BsPerson /> {teacher?.type}
            </h5>
          </div>
        </div>
        <div>
          <div className=" flex flex-row gap-4">
            <div className=" flex flex-row items-center gap-1">
              <BsMailbox />
              <span className=" flex flex-row">{teacher?.email}</span>
            </div>
            <div className=" flex flex-row items-center gap-1">
              <BsPhone />
              <span className=" flex flex-row">{teacher?.phone}</span>
            </div>
          </div>
        </div>
        <MyLink href={"/m"} button={{ variant: "secondary", role: "message" }}>
          Message
        </MyLink>
      </div>
    </section>
  );
};

export default TeacherProfileHeader;
