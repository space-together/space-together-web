import ClassCard from "@/components/cards/class-card";
import SchoolCard from "@/components/cards/school-card";
import { Locale } from "@/i18n";
import { FaSchool } from "react-icons/fa6";
import { MdClass } from "react-icons/md";

interface props {
  lang: Locale;
}

const TeacherHomeBody = ({ lang }: props) => {
  return (
    <div className="py-4 space-y-4">
       <div className=" space-y-2">
        <div className=" space-x-1 flex items-center">
          <FaSchool />
          <h2 className=" font-semibold">School</h2>
        </div>
        <div className=" grid grid-cols-3 gap-4">
          <SchoolCard lang={lang} />
          <SchoolCard lang={lang} />
          <SchoolCard lang={lang} />
        </div>
      </div>
      <div className=" space-y-2">
        <div className=" space-x-1 flex items-center">
          <MdClass />
          <h2 className=" font-semibold">Classes</h2>
        </div>
        <div className=" grid grid-cols-3 gap-4">
          <ClassCard isStudent lang={lang} />
          <ClassCard isSchool isClassTeacher lang={lang} />
          <ClassCard isSchool lang={lang} />
          <ClassCard isClassTeacher lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default TeacherHomeBody;
