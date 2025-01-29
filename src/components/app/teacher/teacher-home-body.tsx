import ClassCard from "@/components/cards/class-card";
import { Locale } from "@/i18n";
import { MdClass } from "react-icons/md";

interface props {
  lang: Locale;
}

const TeacherHomeBody = ({ lang }: props) => {
  return (
    <div className="py-4">
      <div className=" space-y-2">
        <div className=" space-x-1 flex items-center">
          <MdClass />
          <h2 className=" font-semibold">Classes</h2>
        </div>
        <div className=" grid grid-cols-3 gap-4">
          <ClassCard lang={lang} />
          <ClassCard isSchool isClassTeacher lang={lang} />
          <ClassCard isSchool lang={lang} />
          <ClassCard isClassTeacher lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default TeacherHomeBody;
