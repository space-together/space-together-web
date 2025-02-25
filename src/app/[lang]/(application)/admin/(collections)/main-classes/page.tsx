// import CreateClassRoomDialog from '@/components/site/collection/class_room/createClassRoomDialog'
import { auth } from "@/auth";
import MainClassCard from "@/components/cards/main-class-card";
import CreateClassRoomDialog from "@/components/site/collection/class_room/createClassRoomDialog";
import { Locale } from "@/i18n";
import { getAllClassRoom } from "@/services/data/class-room-data";
import sectorService from "@/services/data/sector-data";
import { getAllTrades } from "@/services/data/trade-data";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}

const CollectionMainClasses = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  // if (user.role !== "ADMIN")
  //   return redirect(`${RedirectContents({ lang, role: user.role })}`);
  const [getClassRoom, getSectors, getTrades] = await Promise.all([
    fetchAllClassesRoom(),
    sectorService.getAllSectors(),
    await getAllTrades(),
  ]);

  return (
    <div className=" happy-page">
      <div className=" w-full justify-between flex items-center">
        <h2 className=" happy-title-head">Main Classes </h2>
        <CreateClassRoomDialog sectors={getSectors} trades={getTrades} />
      </div>
      <div className=" gap-4 grid grid-cols-3">
        {[...Array(5)].map((_, i) => (
          <MainClassCard key={i} lang={lang} />
        ))}
      </div>
    </div>
  );
};

export default CollectionMainClasses;
