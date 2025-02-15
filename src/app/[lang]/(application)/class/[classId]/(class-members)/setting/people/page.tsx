import { auth } from "@/auth";
import AddMemberInClassDialog from "@/components/app/class/setting/add-class-member-dialog";
import UserCardSmallCallSetting from "@/components/cards/user-card-small-class-setting";
import MyImage from "@/components/my-components/myImage";
import NotFoundPage from "@/components/page/not-found-page";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { getModuleByTeacherInClassId } from "@/services/data/model-data";
import { getStudentsByClassId } from "@/services/data/student-data";
import { getSubjectByClassId } from "@/services/data/subject-data";
import { getTeachersByClassId } from "@/services/data/teacher-data";
import { getUserById } from "@/services/data/user";
import { redirect } from "next/navigation";
 interface props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassSettingPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  const getClass = await getClassById(classId);
  if (!getClass) return <NotFoundPage />;
  if (user.role !== "ADMIN" && getClass.userId !== user.id)
    return <PermissionPage />;

  const [getTeachers, classSubjects, getStudents] = await Promise.all([
    getTeachersByClassId(classId),
    getSubjectByClassId(classId),
    getStudentsByClassId(classId),
  ]);

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
    <div className=" w-full space-y-4 pr-4">
      <div className=" space-y-2">
        <div className=" flex justify-between items-center mt-4 ">
          <h1 className="happy-title-head">Class member settings </h1>
        </div>
        <p>
          Settings for all people in this class you can add them or remove or
          disable and other activities you want
        </p>
      </div>
      {!!getTeachers && (
        <div className=" mt-4">
          <div className=" w-full">
            <div className=" flex justify-between w-full items-center">
              <h2 className=" happy-title-base">Teachers</h2>
              <AddMemberInClassDialog
                classId={classId}
                classSubjects={classSubjects}
                person="TEACHER"
              />
            </div>
            <div className="space-y-1 flex flex-col mt-2">
              {getTeachers.length === 0 ? (
                <div className="justify-center items-center space-y-2 flex flex-col">
                  <MyImage src="/icons/teacher.png" className="size-16" />
                  <p className="font-medium text-myGray">
                    No teachers in this class, you can add new ones!
                  </p>
                </div>
              ) : (
                teacherCards
              )}
            </div>
          </div>
        </div>
      )}
      {!!getStudents && (
        <div className=" mt-4">
          <div className=" w-full">
            <div className=" flex justify-between w-full items-center">
              <h2 className=" happy-title-base">Students</h2>
              <AddMemberInClassDialog
                classId={classId}
                classSubjects={classSubjects}
                person="STUDENT"
              />
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
    </div>
  );
};

export default ClassSettingPeoplePage;
