import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
 import { BsThreeDots } from "react-icons/bs";

interface props {
  lang: Locale;
}

const StaffPeople = ({ lang }: props) => {
  return (
    <div className=" happy-card p-0">
      <div className=" flex justify-between px-4 py-2 border-b border-b-base-300">
        <div className="   flex gap-2 space-x-1 items-center">
          <MyImage className=" size-6" src="/icons/group.png" />
          <h5 className=" happy-title-base text-my">Peoples</h5>
        </div>
        <Button size="sm" variant="ghost" shape="circle">
          <BsThreeDots />
        </Button>
      </div>
      <div className=" p-4 flex flex-col space-y-4">
        <div className=" flex items-center space-x-4">
          <div className=" font-semibold text-3xl">1024</div>
          <Link
            href={`/${lang}/school-staff/people`}
            className=" font-medium link-hover text-myGray text-sm"
          >
            Total People{" "}
          </Link>
        </div>
        {/* school members */}
        <div className=" space-x-1 flex ">
          <Button size="sm" className=" px-1">
            <span className="  text-xl font-medium">762</span>
            <span className=" text-sm font-normal">Students</span>
          </Button>
          <Button size="sm" className=" px-1">
            <span className="  text-xl font-medium">46</span>
            <span className=" text-sm font-normal">Teacher</span>
          </Button>
          <Button size="sm" className=" px-1">
            <span className="  text-xl font-medium">5</span>
            <span className=" text-sm font-normal">Students</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffPeople;
