import CollectionPageStatic from "@/utils/static/page/collectionPageStatic";
import CreateSectorDialog from "./CreateSectorDialog";
import AllSectorTable from "./allSectorTable";
import { getAllEducation } from "@/services/data/education-data";
import sectorService from "@/services/data/sector-data";

interface props {
  collection: string;
}
const SectorPageDocument = async ({ collection }: props) => {
  const getSectors = await sectorService.getAllSectors();

  const getEducation = await getAllEducation();

  return (
    <CollectionPageStatic collection={collection}>
      <div className=" flex justify-between items-center">
        <h2 className=" happy-title-base">Sector for education</h2>
        <CreateSectorDialog educations={getEducation}/>
      </div>
     <AllSectorTable educations={getEducation} collectionName="sector" sectors={getSectors} />
    </CollectionPageStatic>
  );
};

export default SectorPageDocument;
