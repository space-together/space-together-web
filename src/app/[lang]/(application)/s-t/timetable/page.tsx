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

  const schoolTimetableRes = await Promise.all([
    apiRequest<void, SchoolTimetable>(
      "get",
      "/school/timetables/current",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  return <div>School timetable</div>;
};

export default TimeTablePage;
