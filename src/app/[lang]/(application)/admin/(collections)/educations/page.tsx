import { auth } from "@/auth";
import CreateEducationDialog from "@/components/site/collection/education/createEducationDialog";
import EducationBody from "@/components/site/collection/education/education-body";
import { Locale } from "@/i18n";
import { RedirectContents } from "@/utils/context/redirect-content";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const CollectionEducationPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  if (user.role !== "ADMIN")
    return redirect(`${RedirectContents({ lang, role: user.role })}`);
  return (
    <div className=" happy-page space-y-4">
      <div className=" w-full justify-between flex items-center">
        <h2 className=" happy-title-head">Education </h2>
        <CreateEducationDialog />
      </div>
      <EducationBody lang={lang}/>
    </div>
  );
};

export default CollectionEducationPage;
