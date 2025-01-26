import ClassActivities from "@/components/app/class/classActivities";
import ClassBody from "@/components/app/class/classBody";
import ClassHead from "@/components/app/class/classHead";
import { Separator } from "@/components/ui/separator";

const StudentPage = () => {
  return (
    <div className=" px-4">
      <ClassHead />
      <div className=" mt-28">
        <Separator />
        <div className="flex  justify-between space-x-2">
          <ClassBody />
          <ClassActivities />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
