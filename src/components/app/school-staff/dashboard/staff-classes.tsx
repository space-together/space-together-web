import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
 import { BsThreeDots } from "react-icons/bs";

interface props {
  lang: Locale;
}
const StaffClasses = ({lang} : props) => {
  return (
    <div className=" happy-card p-0">
      <div className=" flex justify-between px-4 py-2 border-b border-b-base-300">
        <div className="   flex gap-2 space-x-1 items-center">
          <MyImage className=" size-6" src="/icons/blackboard.png" />
          <h5 className=" happy-title-base text-my">Classes</h5>
        </div>
        <Button size="sm" variant="ghost" shape="circle">
          <BsThreeDots />
        </Button>
      </div>
      <div className=" p-4 flex flex-col space-y-4">
        <div className=" flex items-center space-x-4">
          <div className=" font-semibold text-3xl">24</div>
          <Link
            href={`/${lang}/school-staff/classes`}
            className=" font-medium link-hover text-myGray text-sm"
          >
            All Classes
          </Link>
        </div>
        {/* school members */}
        <div className=" space-x-1 flex ">
          <Button size="sm" className=" px-1">
            <span className="  text-xl font-medium">12</span>
            <span className=" text-sm font-normal">Primary</span>
          </Button>
          <Button size="sm" className=" px-1">
            <span className="  text-xl font-medium">14</span>
            <span className=" text-sm font-normal">O-Lever</span>
          </Button>
          <Button size="sm" className=" px-1">
            <span className="  text-xl font-medium">21</span>
            <span className=" text-sm font-normal">E-Lever</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StaffClasses
