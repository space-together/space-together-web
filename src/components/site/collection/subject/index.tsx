import CollectionPageStatic from "@/utils/static/page/collectionPageStatic";
import React from "react";
import CreateSubjectDialog from "./create-subject-dialog";

interface props {
  collection: string;
}

const SubjectPageCollection = ({ collection }: props) => {
  return (
    <CollectionPageStatic collection={collection}>
      <div className=" flex justify-between items-center">
        <h2 className=" happy-title-base">Subjects</h2>
        <CreateSubjectDialog />
      </div>
    </CollectionPageStatic>
  );
};

export default SubjectPageCollection;
