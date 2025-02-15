import UserCardSmall from "@/components/cards/user-card-small";
import { Locale } from "@/i18n";
 import { IoPeopleSharp } from "react-icons/io5";

interface props{
    lang: Locale,
}

const ClassPeople = ({lang}: props) => {
  return (
    <div className=" happy-card">
      <div className=" space-y-1">
        <div className=" flex space-x-2 items-center">
          <IoPeopleSharp /> <h3 className=" font-semibold">Class Members</h3>
        </div>
      <div>
        <h4  className=" font-medium">Teachers</h4>
        <div>
            <UserCardSmall userRole="TEACHER" lang={lang}/>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ClassPeople;
