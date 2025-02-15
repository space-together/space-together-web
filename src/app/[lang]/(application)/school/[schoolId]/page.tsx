import { auth } from "@/auth";
import SchoolHeader from "@/components/app/school/school-header";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
 import SchoolHomeAbout from "@/components/app/school/school-home-about";
import SchoolContacts from "@/components/app/school/school-contacts";
import SchoolStaff from "@/components/app/school/school-staff";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolIdPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className=" px-4 space-y-4">
      <SchoolHeader lang={lang}/>
      <Separator />
      <div className=" flex space-x-4 ">
        <div className=" w-1/2">
        <SchoolHomeAbout isAboutSchool lang={lang}/>
        </div>
        <div className=" w-1/2 space-y-2">
          <SchoolContacts />
          <SchoolStaff lang={lang}/>
        </div>
      </div>
      <div className=" h-screen" />
    </div>
  );
};

export default SchoolIdPage;
