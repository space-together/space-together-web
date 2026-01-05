import { UserSmCard } from "@/components/cards/user-card";
import ClassClassTeacherPermissionForm from "@/components/page/class/setting/form/class-class-teacher-permission-form";
import NotFoundPage from "@/components/page/not-found";
import ChangeClassTeacherDialog from "@/components/page/school-staff/dialog/change-class-teacher-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Class } from "@/lib/schema/class/class-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const ClassSettingsClassTeacherPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings/class-teacher">,
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
        <h3 className=" h3">Class Teacher Settings</h3>
        <p className=" text-base-content/50">
          This lets the school decide what the class teacher is allowed to
          change
        </p>
        <Separator />
        <Card>
          <CardContent className=" flex flex-col gap-4">
            <div className=" flex flex-col gap-2">
              <p>Change class teacher</p>
              <UserSmCard
                showMessage
                name="Teacher name"
                gender="MALE"
                className="w-full"
                subjects={["Kinyarwanda", "English"]}
              />
            </div>
            <ChangeClassTeacherDialog auth={auth} cls={clsRes.data} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Class teacher permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassClassTeacherPermissionForm cls={clsRes.data} auth={auth} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassSettingsClassTeacherPage;
