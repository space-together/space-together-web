import CollectionPageStatic from "@/utils/static/page/collectionPageStatic";
import ClassesCollectionDetails from "./classCollectionDetails";
import ClassRoles from "./classesRoles";
import AllClassesTable from "./allClassesTable";
import { getAllClasses } from "@/services/data/class-data";

interface props {
  collection: string;
}
const ClassesPageDocument = async ({ collection }: props) => {
  const getClasses = await getAllClasses();

  return (
    <CollectionPageStatic collection={collection}>
      <div className="min-h-48 flex gap-4 justify-between">
        <ClassesCollectionDetails totalClasses={getClasses.length} />
        <ClassRoles />
      </div>
      <AllClassesTable collectionName={collection} classes={getClasses} />
    </CollectionPageStatic>
  );
};

export default ClassesPageDocument;
