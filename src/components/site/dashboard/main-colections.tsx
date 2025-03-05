import MainCollectionCard from "@/components/cards/main-collection-card";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { List } from "lucide-react";

interface  props {
    lang : Locale
}

const MainCollections = ({lang} : props) => {

  return (
    <div className=" w-1/2 happy-card px-0 space-y-2">
      <div className=" flex space-x-2 items-center px-4">
        <List size={24} />
        <h3 className=" happy-title-base">Main Collections</h3>
      </div>
      <Separator />
      <div>
        <div className=" px-4">
            {/* TODO: add all length  of collection */}
            <MainCollectionCard  name="Educations" link={`/${lang}/admin/educations`} image="/icons/education.png" docs={32}/>
            <MainCollectionCard  name="Sectors" link={`/${lang}/admin/sectors`} image="/icons/education.png" docs={32}/>
            <MainCollectionCard  name="Main Classes" link={`/${lang}/admin/main-classes`} image="/icons/blackboard.png" docs={7}/>
        </div>
      </div>
    </div>
  );
};

export default MainCollections;
