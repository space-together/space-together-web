// import CreateClassRoomDialog from '@/components/site/collection/class_room/createClassRoomDialog'
import { auth } from "@/auth";
import MainClassPageHeader from "@/components/app/main-class/main-class-page-header";
import NotFoundPage from "@/components/page/not-found-page";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getMainClassByIdAPI } from "@/services/data/api-fetch-data";
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

  return (
    <div className=" happy-page">
      <MainClassPageHeader currentMainClass={currentMainClass.data} />
      <Separator />
      <div>
        <div>
          {/* update main class */}
          <h2 className=" happy-title-base">Update main class</h2>
        </div>
      </div>
    </div>
  );
};

export default MainClassPage;
