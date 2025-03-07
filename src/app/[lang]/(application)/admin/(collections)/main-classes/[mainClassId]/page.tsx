// import CreateClassRoomDialog from '@/components/site/collection/class_room/createClassRoomDialog'
import { auth } from "@/auth";
import MainClassPageHeader from "@/components/app/main-class/main-class-page-header";
import UpdateClassRoomForm from "@/components/form/update-class-room-form";
import NotFoundPage from "@/components/page/not-found-page";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getAllSectorAPI, getMainClassByIdAPI } from "@/services/data/api-fetch-data";
import { getAllTrades } from "@/services/data/trade-data";
import { RedirectContents } from "@/utils/context/redirect-content";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale; mainClassId: string }>;
}

const MainClassPage = async (props: props) => {
  const params = await props.params;
  const { lang, mainClassId } = params;
  const currentUser = (await auth())?.user;
  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  if (currentUser.role !== "ADMIN")
    return redirect(`${RedirectContents({ lang, role: currentUser.role })}`);
  const currentMainClass = await getMainClassByIdAPI(mainClassId);
  if (!currentMainClass.data) return <NotFoundPage />;
  const [getSectors, getTrades] = await Promise.all([
    getAllSectorAPI(),
    getAllTrades(),
  ]);
  return (
    <div className=" happy-page">
      <MainClassPageHeader currentMainClass={currentMainClass.data}/>
      <Separator />
      <div className=" flex  space-x-4">
        <div className=" w-1/2 space-y-2">
          {/* update main class */}
        <h2 className=" happy-title-base">Update main class</h2>
        <div className=" happy-card">
        <UpdateClassRoomForm currentMainClass={currentMainClass.data} sectors={getSectors.data} trades={getTrades}/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MainClassPage;
