import { auth } from "@/auth";
import CreateSectorDialog from "@/components/site/collection/sector/CreateSectorDialog";
import SectorBody from "@/components/site/collection/sector/sector-body";
import { Locale } from "@/i18n";
import { getAllEducationAPI } from "@/services/data/api-fetch-data";
import { RedirectContents } from "@/utils/context/redirect-content";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}

const SectorsPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  if (user.role !== "ADMIN")
    return redirect(`${RedirectContents({ lang, role: user.role })}`);
  const getEducation = await getAllEducationAPI();
  return (
    <div className=" happy-page space-y-4">
      <div className=" w-full justify-between flex items-center">
        <h2 className=" happy-title-head">Education Sectors </h2>
        <CreateSectorDialog educations={getEducation.data} />
      </div>
      <SectorBody lang={lang}/>
    </div>
  );
};

export default SectorsPage;
