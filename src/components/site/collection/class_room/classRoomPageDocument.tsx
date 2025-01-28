import CollectionPageStatic, {
} from "@/utils/static/page/collectionPageStatic";
import ClassRoomCollectionDetails from "./classRoomCollectionDetails";
import ClassRoomRoles from "./classRoomRoles";
import AllClassRoomTable from "./allClassRoomTable";
import { getAllSectors } from "@/services/data/sector-data";
import { getAllClassRoom } from "@/services/data/class-room-data";
import { getAllTrades } from "@/services/data/trade-data";

interface props {
  collection: string;
}
const ClassRoomPageDocument = async ({ collection }: props) => {
  const getClassRoom = await getAllClassRoom();

  const getSectors = await getAllSectors()

  const getTrades = await getAllTrades()

  return (
    <CollectionPageStatic collection={collection}>
      <div className="min-h-48 flex gap-4 justify-between">
        <ClassRoomCollectionDetails
          totalRoomClass={getClassRoom.length}
        />
        <ClassRoomRoles/>
      </div>
      <AllClassRoomTable
        sectors={getSectors}
        trades={getTrades}
        collectionName={collection}
        classRoom={getClassRoom}
      />
    </CollectionPageStatic>
  );
};

export default ClassRoomPageDocument;
