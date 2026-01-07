import SchoolCalendar from "@/components/page/school/calendar/school-calendar.tsx";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

const CalendarPage = async (props: PageProps<"/[lang]/school/calendar">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" px-4 py-4 space-y-4">
      <h1 className=" title-page">School Calendar</h1>
      <SchoolCalendar />
    </div>
  );
};

export default CalendarPage;
