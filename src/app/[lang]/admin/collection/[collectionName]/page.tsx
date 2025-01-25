import { CollectionPageErrorStatic } from "@/utils/static/page/collectionPageStatic";
import UserPageCollection from "@/components/site/collection/users/UserPageCollection";
import EducationPageDocument from "@/components/site/collection/education/educationPageDocument";
import SectorPageDocument from "@/components/site/collection/sector/sectorPageComponet";
import TradePageDocument from "@/components/site/collection/trades/TradePageDocument";
import ClassesPageDocument from "@/components/site/collection/classes/classesPageDocument";
import ClassRoomPageDocument from "@/components/site/collection/class_room/classRoomPageDocument";

export default async function CollectionPage(props: {
  params: Promise<{ collectionName: string }>;
}) {
  const params = await props.params;
  const { collectionName } = params;

  switch (collectionName) {
    case "users":
      return <UserPageCollection collectionName={collectionName} />;
    case "educations":
      return <EducationPageDocument collection={collectionName} />;
    case "sector":
      return <SectorPageDocument collection={collectionName} />;
    case "trades":
      return <TradePageDocument collection={collectionName} />;
    case "classes":
      return <ClassesPageDocument collection={collectionName} />;
    case "Class_room":
      return <ClassRoomPageDocument collection={collectionName} />;
    default:
      return <CollectionPageErrorStatic collection={collectionName} />;
  }
}
