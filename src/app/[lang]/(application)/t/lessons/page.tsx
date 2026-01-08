import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

const TeacherLessonsPage = async (props: PageProps<"/[lang]/t/lessons">) => {
  const params = await props.params;
  const { lang } = params;

  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  return <div>teacher lessons</div>;
};

export default TeacherLessonsPage;
