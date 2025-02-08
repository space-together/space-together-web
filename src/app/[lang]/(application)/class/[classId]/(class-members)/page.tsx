import { auth } from "@/auth";
import ClassNotFound from "@/components/app/class/class-not-found";
import ClassActivities from "@/components/app/class/classActivities";
import ClassBody from "@/components/app/class/classBody";
import ClassHead from "@/components/app/class/classHead";
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
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  const myClass = await getClassById(classId);

  if (!myClass) {
    return <ClassNotFound />;
  }
  return (
    <div className=" px-4">
      <ClassHead
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
        myClass={myClass}
        lang={lang}
      />
      <div className=" mt-28">
        <Separator />
        <div className="flex  justify-between space-x-4 mt-4">
          <ClassBody isTeacher={true} lang={lang} />
          <ClassActivities />
        </div>
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default ClassIdPage;
