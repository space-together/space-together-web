 import TeacherCreateNoteDialog from "./teacher-add-note-dialog";

const TeacherClassCreateNotes = () => {
  return (
    <div className="happy-card">
      <h3 className=" happy-title-base">Your lessons</h3>
      <div className=" flex flex-col space-y-1">
        <TeacherCreateNoteDialog subjectId="bruno"/>
      </div>
    </div>
  );
};

export default TeacherClassCreateNotes;
