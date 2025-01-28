import { Separator } from "@/components/ui/separator";
// import CreateClassType from "./CreateClassTypeDialog";
import { classTypeContext } from "@/utils/context/class-context";
import { toLowerCase } from "@/utils/functions/characters";

const ClassRoles = () => {
  return (
    <div className=" happy-card w-1/2 p-0">
      <div className=" p-4 flex justify-between items-center">
        <h2 className="happy-title-base">Collection Roles ({classTypeContext.length})</h2>
        {/* <CreateClassType /> */}
      </div>
      <Separator />
      <div className=" h-36 p-4 space-y-2">
        {classTypeContext.map(async (item, index) => {
          return (
            <div key={index} className=" flex justify-between overflow-y-auto max-h-36">
              <span className="capitalize">
                {toLowerCase(item)}
              </span>
              {/* <div className=" space-x-2">
                <DeleteClassTypeDialog role={item} />
                <UpdateClassTypeDialog classType={item}/>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassRoles;
