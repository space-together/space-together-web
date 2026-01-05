import ChangeClassUsernameAndCode from "@/components/page/class/setting/change-class-username-and-code";
import UpdateClassPublicInfo from "@/components/page/class/setting/form/update-class-public-info-form";
import NotFoundPage from "@/components/page/not-found";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Class } from "@/lib/schema/class/class-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const ClassSettingPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings">,
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
    <RealtimeProvider<Class> channel="school" initialData={[clsRes.data]}>
      <div className=" w-full flex flex-col gap-4">
        <div>
          <h3 className=" h3">General Settings</h3>
          <p className=" text-base-content/50">
            These control the identity and appearance of the class
          </p>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Class public info</CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateClassPublicInfo auth={auth} cls={clsRes.data} />
            </CardContent>
          </Card>
        </div>
        <div>
          <h3 className=" h3">Change class username & Code </h3>
          <Separator />
          <Card>
            <CardContent>
              <ChangeClassUsernameAndCode
                lang={lang as Locale}
                auth={auth}
                cls={clsRes.data}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </RealtimeProvider>
  );
};

export default ClassSettingPage;
