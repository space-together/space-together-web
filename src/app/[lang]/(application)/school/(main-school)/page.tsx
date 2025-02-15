import { auth } from "@/auth";
import SchoolHomeBody from "@/components/app/school/school-home-body";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
 
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" px-4 space-y-4">
      <SchoolHomeBody lang={lang} />
      <div className=" h-screen" />
    </div>
  );
};

export default SchoolPage;
