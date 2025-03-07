import MyImage from "@/components/my-components/myImage";
import { ClassRoom } from "../../../../prisma/prisma/generated";
import { TfiWorld } from "react-icons/tfi";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface props {
  currentMainClass: ClassRoom;
}
const MainClassPageHeader = ({ currentMainClass }: props) => {
  return (
    <div className=" flex justify-between w-full items-center">
      <div className=" flex space-x-4">
        <MyImage
          classname="card"
          className=" size-28"
          src={
            currentMainClass?.symbol
              ? currentMainClass.symbol
              : "/images/11.jpg"
          }
        />
        <div className=" space-y-1">
          <h1 className=" happy-title-head">{currentMainClass.name}</h1>
          <span className=" link-hover">@ {currentMainClass.username}</span>
          {!!currentMainClass.sector_id && (
            <div className=" flex font-semibold items-center text-sm space-x-2">
              <TfiWorld /> 
              <span>
                Sector: {" "}
                {currentMainClass.sector_id}
              </span>
            </div>
          )}
          {!!currentMainClass.trade_id && (
            <div className=" text-sm text-myGray flex space-x-2 font-semibold items-center">
              <TfiWorld />
              <span>
                <span className=" text-myGray">Trade</span>:{" "}
                {currentMainClass.trade_id}
              </span>
            </div>
          )}
          {!!currentMainClass.class_room_type && (
            <div className=" text-sm text-myGray flex space-x-2 font-semibold items-center">
              <TfiWorld />
              <span>
                <span className=" text-myGray">Role</span>:{" "}
                {currentMainClass.class_room_type}
              </span>
            </div>
          )}
        </div>
      </div>
      <Button variant="error">
        <Trash2 />
        Delete
      </Button>
    </div>
  );
};

export default MainClassPageHeader;
