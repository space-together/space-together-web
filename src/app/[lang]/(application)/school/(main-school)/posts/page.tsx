import { auth } from "@/auth";
import SchoolHomePosts from "@/components/app/school/school-home-posts";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPostsPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" px-4 space-x-4 flex ">
      <SchoolHomePosts className=" grid-cols-3" isOnSchoolPost lang={lang} />
      <div className=" h-screen"/>
    </div>
  );
};

export default SchoolPostsPage;
