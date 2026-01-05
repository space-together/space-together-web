import { UserSmCard } from "@/components/cards/user-card";
import ClassTeacherPermissionForm from "@/components/page/class/setting/form/class-teacher-permission-form";
import ClassTeacherSettingPageFilter from "@/components/page/class/setting/teacher/class-teachers-settings-page-filter";
import NotFoundPage from "@/components/page/not-found";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Class } from "@/lib/schema/class/class-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const ClassSettingsTeachersPage = async (
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
    `/school/classes/match?field=username&value=${classUsername}`,
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
        <h3 className=" h3">Teacher Settings</h3>
        <p className=" text-base-content/50">
          This is for managing all teachers connected to the class
        </p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Teacher permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ClassTeacherPermissionForm auth={auth} cls={clsRes.data} />
          </CardContent>
        </Card>
      </div>

      <div className=" flex flex-col gap-2 ">
        <ClassTeacherSettingPageFilter />
        <Separator />
        {/*students*/}
        <div className=" grid grid-cols-2  gap-2 gap-x-8 w-full">
          {[...Array(9)].map((_, t) => {
            return (
              <UserSmCard
                key={t}
                showMessage
                name="Teacher name"
                gender="MALE"
                className="w-full"
                subjects={["Kinyarwanda", "English"]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassSettingsTeachersPage;
