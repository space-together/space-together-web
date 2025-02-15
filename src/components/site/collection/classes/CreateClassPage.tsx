import DocumentPageStatic, {
} from "@/utils/static/page/documentPageStatic";
// import CreateClassForm from "./createClassForm";
// import { getAllEducation } from "@/services/data/education-data";
// import sectorService from "@/services/data/sector-data";

const CreateClassPage = async () => {
  // const getEducations = await getAllEducation();
  // const educationClass = await sectorService.getSectorsByEducationId("6797b81f071fbeb2d8b5512c");
  return (
    <DocumentPageStatic collectionName="classes" documentName="Class-add">
      <div></div>
      {/* <CreateClassForm sectorsK={educationClass} educations={getEducations} /> */}
    </DocumentPageStatic>
  );
};

export default CreateClassPage;
