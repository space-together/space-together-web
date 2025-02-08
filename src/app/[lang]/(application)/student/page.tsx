import { auth } from "@/auth";
import ClassActivities from "@/components/app/class/classActivities";
import ClassBody from "@/components/app/class/classBody";
import ClassHead from "@/components/app/class/classHead";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";


interface props {
  params: Promise<{ lang: Locale }>;
}


const StudentPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" px-4">
      <ClassHead lang={lang}/>
      <div className=" mt-28">
        <Separator />
        <div className="flex  justify-between space-x-4 mt-4">
          <ClassBody lang={lang}/>
          <ClassActivities />
        </div>
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default StudentPage;
