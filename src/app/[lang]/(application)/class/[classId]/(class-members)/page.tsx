import { auth } from "@/auth";
import ClassActivities from "@/components/app/class/classActivities";
import ClassBody from "@/components/app/class/classBody";
import ClassHead from "@/components/app/class/classHead";
import NotFoundPage from "@/components/page/not-found-page";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassIdPage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  const myClass = await getClassById(classId);
  if (!myClass) {
    return <NotFoundPage />;
  }

  //TODO: check if use allowed to access class

  return (
    <div className=" px-4">
      <ClassHead myClass={myClass} lang={lang} />
      <div className=" mt-28">
        <Separator />
        <div className="flex  justify-between space-x-4 mt-4">
          <ClassBody classId={classId} isTeacher={true} lang={lang} />
          <ClassActivities />
        </div>
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default ClassIdPage;
