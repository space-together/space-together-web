import { UserSmCard } from "@/components/cards/user-card";
import ClassClassworkSettingForm from "@/components/page/class/setting/form/class-classwork-setting-form";
import ClassStudentPermissionForm from "@/components/page/class/setting/form/class-students-permissions-form";
import ClassStudentSettingPageFilter from "@/components/page/class/setting/students/class-students-settings-page-filter";
import NotFoundPage from "@/components/page/not-found";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Class } from "@/lib/schema/class/class-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const ClassSettingsStudentsPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings/students">,
) => {
  const params = await props.params;
  const { lang, classUsername } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  const clsRes = await apiRequest<void, Class>(
    "get",
    `/school/classes/username/${classUsername}`,
    undefined,
    {
      token: auth.token,
      schoolToken: auth.schoolToken,
      realtime: "class",
    },
  );
  if (!clsRes.data)
    return <NotFoundPage message={`This ${classUsername} those not found`} />;

  return (
    <div className=" w-full flex flex-col gap-4">
      <div>
        <h3 className=" h3">Student Settings</h3>
        <p className=" text-base-content/50">
          These settings control how students are added, managed, and behave
          inside the class
        </p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Student permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ClassStudentPermissionForm auth={auth} cls={clsRes.data} />
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className=" h3">Classwork rules</h3>
        <p className=" text-base-content/50">
          Configure how classwork is submitted, reviewed, and managed.
        </p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Classwork Submission Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ClassClassworkSettingForm />
          </CardContent>
        </Card>
      </div>
      <div className=" flex flex-col gap-2 ">
        <ClassStudentSettingPageFilter />
        <Separator />
        {/*students*/}
        <div className=" grid grid-cols-2  gap-2 gap-x-8 w-full">
          {[...Array(11)].map((_, t) => {
            return (
              <UserSmCard
                key={t}
                showMessage
                name="Student name"
                gender="MALE"
                className="w-full"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassSettingsStudentsPage;
