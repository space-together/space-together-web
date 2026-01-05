import AcademicYearDialog from "@/components/page/admin/sector/academic-year/education-year-dialog";
import EducationYearItems from "@/components/page/admin/sector/academic-year/education-years-items";
import SectorHeader from "@/components/page/admin/sector/sector-header";
import SectorTradesCard from "@/components/page/admin/sector/sector-trades-card";
import AppPageHeader from "@/components/page/common/app-page-header";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { EducationYear } from "@/lib/schema/admin/education-year-schema";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sectorUsername: string }>;
}): Promise<Metadata> {
  const { sectorUsername } = await params;
  return {
    title: `${sectorUsername} Sector | space-together`,
    description: `Details for Sector ${sectorUsername}`,
  };
}

const SectorUsernamePage = async (
  props: PageProps<"/[lang]/a/collections/sectors/[sectorUsername]">,
) => {
  const params = await props.params;
  const { sectorUsername, lang } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  const sectorRes = await apiRequest<void, SectorModel>(
    "get",
    `/sectors/match?field=username&value=${sectorUsername}`,
    undefined,
    { token: auth.token, realtime: "sector" },
  );

  if (sectorRes.statusCode === 404)
    return <NotFoundPage message={sectorRes.message} />;
  if (!sectorRes.data)
    return <ErrorPage message={sectorRes.message} error={sectorRes.error} />;

  const [tradesRes, educationYearsRes] = await Promise.all([
    apiRequest<void, Paginated<TradeModule>>(
      "get",
      `/trades?field=sector_id&value=${sectorRes.data._id}`,
      undefined,
      { token: auth.token, realtime: "trade" },
    ),
    apiRequest<void, Paginated<EducationYear>>(
      "get",
      `/education-years?field=curriculum_id&value=${sectorRes.data._id || sectorRes.data.username}`,
      undefined,
      { token: auth.token, realtime: "education_year" },
    ),
  ]);

  if (!tradesRes.data)
    return <ErrorPage message={tradesRes.message} error={tradesRes.error} />;

  return (
    <RealtimeProvider<SectorModel | TradeModule | EducationYear>
      channels={[
        { name: "sector", initialData: [sectorRes.data] },
        { name: "trade", initialData: tradesRes.data.data ?? [] },
        {
          name: "education_year",
          initialData: educationYearsRes?.data?.data ?? [],
        },
      ]}
    >
      <main className="flex flex-col gap-4 ">
        <AppPageHeader title="Sector" description="" />
        <SectorHeader
          sector={sectorRes.data}
          auth={auth}
          lang={lang as Locale}
        />
        <Separator />
        <main className="w-full flex flex-row gap-4">
          <div className=" lg:w-1/2">
            <SectorTradesCard
              sector={sectorRes.data}
              trades={tradesRes.data.data ?? []}
              auth={auth}
            />
          </div>
          <div className=" lg:w-1/2 flex flex-col gap-2">
            <div className=" flex flex-row justify-between items-center  w-full">
              <h4 className=" h5">Education years</h4>
              <AcademicYearDialog sector={sectorRes.data} auth={auth} />
            </div>
            <EducationYearItems years={educationYearsRes?.data?.data ?? []} />
          </div>
        </main>
      </main>
    </RealtimeProvider>
  );
};

export default SectorUsernamePage;
