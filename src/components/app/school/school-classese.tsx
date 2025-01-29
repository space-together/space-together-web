import ClassCard from "@/components/cards/class-card";
import { Locale } from "@/i18n";
import { MdClass } from "react-icons/md";

interface props {
  lang: Locale;
}
const SchoolClasses = ({ lang }: props) => {
  return (
    <div className=" space-y-2">
      <div className=" space-x-1 flex items-center">
        <MdClass />
        <h2 className=" font-semibold">Classes</h2>
      </div>
      <div className=" grid grid-cols-1 w-full gap-4">
        <ClassCard lang={lang} />
        <ClassCard lang={lang} />
        <ClassCard lang={lang} />
        <ClassCard lang={lang} />
        <ClassCard lang={lang} />
      </div>
      <div className=" happy-card justify-center items-center flex-row">
        <span className=" link">See More</span>
      </div>
    </div>
  );
};

export default SchoolClasses;
