import SearchPeopleClass from "@/components/app/class/people/search-people-class";
 import { Locale } from "@/i18n";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTeachersByClassId } from "@/services/data/teacher-data";
import { getUserById } from "@/services/data/user";
import { getModuleByTeacherInClassId } from "@/services/data/model-data";
import UserCardSmallCallSetting from "@/components/cards/user-card-small-class-setting";
import MyImage from "@/components/my-components/myImage";
import AddMemberInClassDialog from "@/components/app/class/setting/add-class-member-dialog";
import { getSubjectByClassId } from "@/services/data/subject-data";
import { getClassById } from "@/services/data/class-data";
import { getStudentsByClassId } from "@/services/data/student-data";

interface props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser) return redirect(`/${lang}/auth/login`);

  const [getTeachers, classSubjects, getClass, getStudents] = await Promise.all(
    [
      getTeachersByClassId(classId),
      getSubjectByClassId(classId),
      getClassById(classId),
      getStudentsByClassId(classId),
    ]
  );

  const teacherCards = await Promise.all(
    getTeachers.map(async (item) => {
      const [user, getModels] = await Promise.all([
        getUserById(item.userId),
        getModuleByTeacherInClassId(item.id, classId),
      ]);
      return (
        <UserCardSmallCallSetting
          key={item.userId}
          modules={getModels}
          user={user}
          userRole="TEACHER"
          lang={lang}
        />
      );
    })
  );

  const StudentCards = await Promise.all(
    getStudents.map(async (item) => {
      const { user } = item;
      return (
        <UserCardSmallCallSetting
          key={item.id}
          user={user}
          userRole="STUDENT"
          lang={lang}
        />
      );
    })
  );

  return (
    <div className="px-4 py-4 space-y-4">
      <SearchPeopleClass />
      {!!getTeachers && (
        <div className="space-y-2">
          <div className=" flex justify-between w-full items-center">
            <h2 className=" happy-title-base">Teachers</h2>
            {(currentUser.role === "ADMIN" ||
              currentUser.id === getClass?.userId) && (
              <AddMemberInClassDialog
                classId={classId}
                classSubjects={classSubjects}
                person="TEACHER"
              />
            )}
          </div>
          <div className="space-y-1 flex flex-col gap-2">
            {getTeachers.length === 0 ? (
              <div className="justify-center items-center space-y-1 flex flex-col">
                <MyImage src="/icons/teacher.png" className="size-16" />
                <p className="font-medium text-myGray">
                  No teachers in this class!
                </p>
                {(getClass?.userId === currentUser.id ||
                  currentUser.role === "ADMIN") && (
                  <AddMemberInClassDialog
                    classId={classId}
                    classSubjects={classSubjects}
                    person="TEACHER"
                  />
                )}
              </div>
            ) : (
              teacherCards
            )}
          </div>
        </div>
      )}

      {!!getStudents && (
        <div className=" mt-4">
          <div className=" w-full">
            <div className=" flex justify-between w-full items-center">
              <h2 className=" happy-title-base">Students</h2>
              {(currentUser.role === "ADMIN" ||
                currentUser.id === getClass?.userId) && (
                <AddMemberInClassDialog
                  classId={classId}
                  classSubjects={classSubjects}
                  person="STUDENT"
                />
              )}
            </div>
            <div className="space-y-1 flex flex-col mt-2">
              {StudentCards.length === 0 ? (
                <div className="justify-center items-center space-y-1 flex flex-col">
                  <MyImage src="/icons/student.png" className="size-16" />
                  <p className="font-medium text-myGray">
                    No student in this class, you can add new ones!
                  </p>
                </div>
              ) : (
                StudentCards
              )}
            </div>
          </div>
        </div>
      )}
      <div className="h-screen" />
    </div>
  );
};

export default ClassPeoplePage;
