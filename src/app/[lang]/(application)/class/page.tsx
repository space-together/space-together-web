
import ClassCard from "@/components/cards/class-card";
import SchoolCard from "@/components/cards/school-card";
import { Locale } from "@/i18n";
import { FaSchool } from "react-icons/fa6";
import { MdClass } from "react-icons/md";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ClassIdPage = async (props: Props) => {
  const params = await props.params;
  const {lang} = params;
  return (
    <div className="py-4 space-y-4 px-4">
    <div className=" space-y-2">
     <div className=" space-x-1 flex items-center">
       <FaSchool />
       <h2 className=" font-semibold">School</h2>
     </div>
     <div className=" grid grid-cols-3 gap-4">
       <SchoolCard isStudent lang={lang} />
       <SchoolCard isStudent lang={lang} />
       <SchoolCard isStudent lang={lang} />
     </div>
   </div>
   <div className=" space-y-2">
     <div className=" space-x-1 flex items-center">
       <MdClass />
       <h2 className=" font-semibold">Classes</h2>
     </div>
     <div className=" grid grid-cols-3 gap-4">
       <ClassCard isStudent lang={lang} />
       <ClassCard isStudent isClassTeacher lang={lang} />
       <ClassCard isStudent lang={lang} />
       <ClassCard isStudent lang={lang} />
     </div>
   </div>
 </div>
  );
};

export default ClassIdPage;
