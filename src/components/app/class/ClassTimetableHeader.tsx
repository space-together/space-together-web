import { Button } from "@/components/ui/button";
 import { BsThreeDotsVertical } from "react-icons/bs";

const ClassTimetableHeader = () => {
  return (
    <div className=" flex justify-between p-4 items-center">
      <h2 className=" font-medium text-lg">L5SOD Time Table</h2>
      <div>
        <Button variant="ghost" size="sm" shape="circle">
          <BsThreeDotsVertical />
        </Button>
      </div>
    </div>
  );
};

export default ClassTimetableHeader;
