import CollectionPageStatic from "@/utils/static/page/collectionPageStatic";
import React from "react";
import CreateSubjectDialog from "./create-subject-dialog";
import { getAllSubject } from "@/services/data/subject-data";
import AllSubjectTable from "./subject-table";

interface props {
  collection: string;
}

const SubjectPageCollection =async ({ collection }: props) => {
  const getSubjects = await getAllSubject()
  return (
    <CollectionPageStatic collection={collection}>
      <div className=" flex justify-between items-center">
        <h2 className=" happy-title-base">Subjects</h2>
        <CreateSubjectDialog />
      </div>
      <AllSubjectTable subjects={getSubjects} />
    </CollectionPageStatic>
  );
};

export default SubjectPageCollection;
