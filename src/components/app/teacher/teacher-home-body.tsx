import ClassCard from "@/components/cards/class-card";
// import SchoolCard from "@/components/cards/school-card";
import { Locale } from "@/i18n";
// import { FaSchool } from "react-icons/fa6";
import { MdClass } from "react-icons/md";
import { Class } from "../../../../prisma/prisma/generated";
import CreateClassDialog from "../class/createClassDialog";

interface props {
  lang: Locale;
  classes: Class[];
  teacherClasses?: Class[] | null;
}

const TeacherHomeBody = ({ lang, classes, teacherClasses }: props) => {
  return (
    <div className="py-4 space-y-4">
      {/* <div className=" space-y-2">
        <div className=" space-x-1 flex items-center">
          <FaSchool />
          <h2 className=" font-semibold">School</h2>
        </div>
        <div className=" grid grid-cols-3 gap-4">
          <SchoolCard lang={lang} />
          <SchoolCard lang={lang} />
          <SchoolCard lang={lang} />
        </div>
      </div> */}
      <div className="  space-y-2">
        <div className="   justify-between items-center flex">
          <div className=" space-x-1 flex items-center">
            <MdClass />
            <h2 className=" font-semibold">Classes</h2>
          </div>
          <CreateClassDialog haveClass />
        </div>
        <div className=" space-y-2">
          <h3 className=" happy-title-base">Your classes</h3>
          <div className=" grid grid-cols-3 gap-4">
            {classes.map((item) => {
              return <ClassCard myClass={item} key={item.id} lang={lang} />;
            })}
          </div>
        </div>
        {teacherClasses && (
          <div className=" space-y-2">
            <h3 className=" happy-title-base">Other classes</h3>
            <div className=" grid grid-cols-3 gap-4">
              {teacherClasses.map((item) => {
                return <ClassCard myClass={item} key={item.id} lang={lang} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherHomeBody;
