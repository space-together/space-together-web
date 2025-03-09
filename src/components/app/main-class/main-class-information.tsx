import MainClassInformationSubjects from "./main-class-information-subjects";
import CreateSubjectDialog from "@/components/site/collection/subject/create-subject-dialog";

const MainClassInformation = () => {
  return (
    <div className=" happy-card space-y-2">
      <div className=" space-y-2">
        <div className=" flex justify-between items-center w-full">
          <h3 className=" happy-title-base">Subjects</h3>
          <CreateSubjectDialog />
        </div>
        <MainClassInformationSubjects />
      </div>
    </div>
  );
};

export default MainClassInformation;
