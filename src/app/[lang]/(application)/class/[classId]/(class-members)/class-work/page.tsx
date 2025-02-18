import PostCard from "@/components/cards/post-card";
import SearchActivities from "@/components/app/class/class-work/search-activities";
import SelectClassActivitiesSubject from "@/components/app/class/class-work/select-class-activities-subject";
 import { Locale } from "@/i18n";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isUserInClass } from "@/services/data/class-data";
import PermissionPage from "@/components/page/permission-page";

interface props {
  params: Promise<{ lang: Locale , classId : string}>;
}

const ClassWorkPage = async (props: props) => {
  const params = await props.params;
  const { lang , classId} = params;
  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const isClassMember = await isUserInClass(currentUser.id, classId);
  if (!isClassMember) return <PermissionPage />;
  return (
    <div className=" p-4 space-y-2">
      <SearchActivities />
      <div className=" space-y-4">
        <SelectClassActivitiesSubject />
        <div className=" space-y-2">
          <h5 className=" text-lg font-medium">This week Kinyarwanda Activities</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PostCard lang={lang} postRole="ACTIVITY"/>
            <PostCard lang={lang} postRole="ACTIVITY"/>
            <PostCard lang={lang} postRole="ACTIVITY"/>
            <PostCard lang={lang} postRole="ACTIVITY"/>
          </div>
          <div className=" happy-card justify-center flex-row link-info link">See all Kinyarwanda Activities</div>
        </div>
        <div className=" space-y-2">
          <h5 className=" text-lg font-medium">This week React Activities</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PostCard lang={lang} postRole="ACTIVITY"/>
            <PostCard lang={lang} postRole="ACTIVITY"/>
            <PostCard lang={lang} postRole="ACTIVITY"/>
            <PostCard lang={lang} postRole="ACTIVITY"/>
            <PostCard lang={lang} postRole="ACTIVITY"/>
          </div>
          <div className=" happy-card justify-center flex-row link-info link">See all Reacts Activities</div>
        </div>
      </div>
      <div className=" h-screen"/>
    </div>
  );
};

export default ClassWorkPage;
