import CreateClassWorkCard from "@/components/page/class/cards/create-classwork-card";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

const NewClassworkPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/classwork/subject/[subjectCode]/new">,
) => {
  const params = await props.params;
  const { lang, classUsername, subjectCode } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className=" flex flex-col gap-4">
      <h3 className="h3">New Class work</h3>
      <CreateClassWorkCard auth={auth} />
    </div>
  );
};

export default NewClassworkPage;
