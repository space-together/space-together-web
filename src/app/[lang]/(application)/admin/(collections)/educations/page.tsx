import { auth } from "@/auth";
import EducationCard from "@/components/cards/education-card";
import CreateEducationDialog from "@/components/site/collection/education/createEducationDialog";
// import EducationBody from "@/components/site/collection/education/education-body";
import { Locale } from "@/i18n";
import { getAllEducationAPI } from "@/services/data/api-fetch-data";
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
  const [allEducation] = await Promise.all([getAllEducationAPI()]);
  return (
    <div className=" happy-page space-y-4">
      <div className=" w-full justify-between flex items-center">
        <h2 className=" happy-title-head">Education </h2>
        <CreateEducationDialog />
      </div>
      {/* <EducationBody /> */}
      <div className=" grid gap-4 grid-cols-3">
        {"error" in allEducation ? (
          <div>np educations</div>
        ) : (
          allEducation.data.map((education) => {
            return (
              <EducationCard
                education={education}
                lang={lang}
                key={education.username}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CollectionEducationPage;
