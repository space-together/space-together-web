import { Separator } from "@/components/ui/separator";
// import CreateClassRoomTypeDialog from "./CreateClassRoomTypeDialog";
import { classRoomTypeContext } from "@/utils/context/class-room-context";
import { toLowerCase } from "@/utils/functions/characters";

const ClassRoomRoles = () => {
  return (
    <div className=" happy-card w-1/2 p-0">
      <div className=" p-4 flex justify-between items-center">
        <h2 className="happy-title-base">Collection Roles ({classRoomTypeContext.length})</h2>
        {/* <CreateClassRoomTypeDialog /> */}
      </div>
      <Separator />
      <div className=" h-36 p-4 space-y-2 overflow-y-auto max-h-36">
        {classRoomTypeContext.map(async (item, index) => {
          const change = toLowerCase(item)
          return (
            <div key={index} className=" flex justify-between">
              <span className="  capitalize">
                {change}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassRoomRoles;
