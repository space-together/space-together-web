import SchoolHomePosts from "@/components/page/school/school-home-posts";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

const SchoolPostsPage = async (props: PageProps<"/[lang]/school/posts">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className="flex space-x-4 px-4">
      <SchoolHomePosts
        auth={auth}
        className="grid-cols-2"
        isOnSchoolPost
        lang={lang as Locale}
      />
      <div className="h-screen" />
    </div>
  );
};

export default SchoolPostsPage;
