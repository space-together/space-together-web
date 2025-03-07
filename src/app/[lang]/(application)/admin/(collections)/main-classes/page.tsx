// import CreateClassRoomDialog from '@/components/site/collection/class_room/createClassRoomDialog'
import { auth } from "@/auth";
import CreateClassRoomDialog from "@/components/site/collection/class_room/createClassRoomDialog";
import MainClassesBody from "@/components/site/collection/class_room/main-classes-body";
import { Locale } from "@/i18n";
import { getAllSectorAPI } from "@/services/data/api-fetch-data";
import { getAllTrades } from "@/services/data/trade-data";
import { RedirectContents } from "@/utils/context/redirect-content";
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
  if (user.role !== "ADMIN")
    return redirect(`${RedirectContents({ lang, role: user.role })}`);
  const [getSectors, getTrades] = await Promise.all([
    getAllSectorAPI(),
    getAllTrades(),
  ]);

  return (
    <div className=" happy-page space-y-4">
      <div className=" w-full justify-between flex items-center">
        <h2 className=" happy-title-head">Main Classes </h2>
        <CreateClassRoomDialog sectors={getSectors.data} trades={getTrades} />
      </div>
      <MainClassesBody lang={lang} />
    </div>
  );
};

export default CollectionMainClasses;
