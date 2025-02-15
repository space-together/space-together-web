 import CreateNewPostInClass from "./create-post-new-post-in-class";
import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import TeacherClassCreateNotes from "../teacher/teacher-class-create-notes";
import { auth } from "@/auth";

interface props {
  lang: Locale;
  isTeacher?: boolean;
  classId?: string;
}

const ClassBody = async ({ lang, isTeacher, classId }: props) => {
  const user = (await auth())?.user;
  return (
    <div className="w-full space-y-4">
      {!!user && (
        <CreateNewPostInClass
          classId={classId}
          user={{
            ...user,
            name: user.name ?? "",
            email: user.email ?? undefined,
            image: user.image ?? undefined,
          }}
        />
      )}
      {isTeacher && <TeacherClassCreateNotes />}
      {/* simple of notes */}
      <PostCard lang={lang} postRole="NOTES" />
      <PostCard lang={lang} postRole="IMAGE" />
      <PostCard lang={lang} postRole="NOTES" />
      <PostCard lang={lang} postRole="IMAGE" />
      <PostCard lang={lang} postRole="NOTES" />
      <PostCard lang={lang} postRole="IMAGE" />
      <div className=" h-screen" />
    </div>
  );
};

export default ClassBody;
