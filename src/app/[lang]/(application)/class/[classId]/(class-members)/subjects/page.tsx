import { auth } from "@/auth";
import SubjectCardSmall from "@/components/cards/subject-card-small";
import NotFoundPage from "@/components/page/not-found-page";
import CreateSubjectDialog from "@/components/site/collection/subject/create-subject-dialog";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { getSubjectByClassId } from "@/services/data/subject-data";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassSubjectPage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }

  const getClass = await getClassById(classId);
  if (!getClass) return <NotFoundPage />;

  const classSubject = await getSubjectByClassId(classId);
  return (
    <div className=" happy-page w-full">
      <div className=" flex justify-between w-full items-center">
        <h1 className=" happy-title-head">Subjects</h1>
        {(currentUser.role === "ADMIN" ||
          currentUser.id === getClass?.userId) && (
          <CreateSubjectDialog classId={classId} />
        )}
      </div>
      <div className=" space-y-2 mt-4">
        {classSubject && classSubject.length === 0 ? (
          <div>They is no subjects in this class</div>
        ) : (
          classSubject?.map((item) => {
            return (
              <SubjectCardSmall
                getClass={getClass}
                currentUser={{
                  ...currentUser,
                  name: currentUser.name ?? "",
                  email: currentUser.email ?? undefined,
                  image: currentUser.image ?? undefined,
                }}
                subject={item}
                key={item.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ClassSubjectPage;
