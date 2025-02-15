import { auth } from "@/auth";
import SchoolStaff from "@/components/app/school/school-staff";
import SchoolStudents from "@/components/app/school/school-student";
import SchoolTeachers from "@/components/app/school/school-teachers";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
 interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className="  min-h-screen px-4 space-x-4 flex ">
      <div className=" w-1/2 space-y-4">
        <SchoolStaff lang={lang} />
        <SchoolStudents onThePage lang={lang}/>
      </div>
      <div className=" w-1/2 space-y-4">
        <SchoolTeachers onThePage lang={lang} />
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default SchoolPeoplePage;
