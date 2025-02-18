import { auth } from "@/auth";
import ClassHead from "@/components/app/class/classHead";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ClassBody from "@/components/app/class/classBody";
import TeacherClassCreateNotes from "@/components/app/teacher/teacher-class-create-notes";
import ClassTeacherProgress from "@/components/app/teacher/teacher-class-progress";

interface props {
  params: Promise<{ lang: Locale }>;
}
const TeacherClassPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className="p-4 ">
      <ClassHead lang={lang} />
      <div className=" mt-28">
        <Separator />
        <div className="flex  space-x-4 mt-4">
          <div className=" space-y-4 w-1/2">
            <TeacherClassCreateNotes />
            <ClassBody lang={lang} />
          </div>
          <div className="w-1/2">
            <ClassTeacherProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassPage;
