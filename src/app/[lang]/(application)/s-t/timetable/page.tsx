import CommonEmpty from "@/components/common/common-empty";
import AppPageHeader from "@/components/page/common/app-page-header";
import SchoolTimetableViewer from "@/components/page/school-staff/time-table/school-timetable";
import SchoolTimetableDialog from "@/components/page/school-staff/time-table/school-timetable-dialog";
import type { Locale } from "@/i18n";
import type { SchoolTimetable } from "@/lib/schema/school/school-timetable-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const TimeTablePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const [schoolTimetableRes] = await Promise.all([
    apiRequest<void, SchoolTimetable>(
      "get",
      `/school/timetables/flied?flied=school_id&value=${auth.school?.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  return (
    <div>
      <div className=" flex flex-col gap-4">
        <AppPageHeader title="School Timetable" description={""} />
        {schoolTimetableRes.data ? (
          <SchoolTimetableViewer timetable={schoolTimetableRes.data} />
        ) : (
          <div>
            <CommonEmpty
              title="They haven't created a timetable yet."
              description="You can create a timetable by clicking the button below."
            >
              <SchoolTimetableDialog auth={auth} />
            </CommonEmpty>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTablePage;
