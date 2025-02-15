import { auth } from "@/auth";
import SubjectCardSmall from "@/components/cards/subject-card-small";
import NotFoundPage from "@/components/page/not-found-page";
import CreateSubjectDialog from "@/components/site/collection/subject/create-subject-dialog";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { getModuleByClassId } from "@/services/data/model-data";
import { getSubjectById } from "@/services/data/subject-data";
import { getTeacherById } from "@/services/data/teacher-data";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassSubjectPage = async ({ params }: Props) => {
  const { lang, classId } = await params;
  const currentUser = (await auth())?.user;
  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }

  const getClass = await getClassById(classId);
  if (!getClass) return <NotFoundPage />;

  const getModules = await getModuleByClassId(classId);
  if (!getModules) return <NotFoundPage />;

  // Fetch teachers and their users in parallel
  const moduleTeacher = await Promise.all(
    getModules.map(async (module) => {
      if (!module.teacherId) return { module, teacher: null, user: null };
      const teacher = await getTeacherById(module.teacherId);
      const getSubject = await getSubjectById(module.subjectId)
      return { subject :getSubject, teacher, user: teacher?.user ?? null , module};
    })
  );
  return (
    <div className="happy-page w-full">
      <div className="flex justify-between w-full items-center">
        <h1 className="happy-title-head">Subjects</h1>
        {(currentUser.role === "ADMIN" || currentUser.id === getClass?.userId) && (
          <CreateSubjectDialog classId={classId} />
        )}
      </div>
      <div className="space-y-2 mt-4">
        {moduleTeacher.length === 0 ? (
          <div>There are no subjects in this class</div>
        ) : (
          moduleTeacher.map(({module, subject, user }) => (
            <SubjectCardSmall
              key={module.id}
              getClass={getClass}
              teacher={user}
              currentUser={{
                ...currentUser,
                name: currentUser.name ?? "",
                email: currentUser.email ?? undefined,
                image: currentUser.image ?? undefined,
              }}
              subject={subject}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ClassSubjectPage;
