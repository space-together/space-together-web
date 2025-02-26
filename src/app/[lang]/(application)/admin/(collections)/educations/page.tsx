import { auth } from "@/auth";
import EducationCard from "@/components/cards/education-card";
import CreateEducationDialog from "@/components/site/collection/education/createEducationDialog";
import { Locale } from "@/i18n";
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
  return (
    <div className=" happy-page space-y-4">
      <div className=" w-full justify-between flex items-center">
        <h2 className=" happy-title-head">Education </h2>
        <CreateEducationDialog />
      </div>
      <div className=" grid gap-4 grid-cols-3">
      {[...Array(3)].map((_,i) => (
        <EducationCard lang={lang} key={i} />
      ))}
      </div>
    </div>
  )
}

export default CollectionEducationPage
