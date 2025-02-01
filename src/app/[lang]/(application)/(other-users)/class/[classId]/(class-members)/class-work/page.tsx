import PostCard from "@/components/cards/post-card";
import SearchActivities from "@/components/app/class/class-work/search-activities";
import SelectClassActivitiesSubject from "@/components/app/class/class-work/select-class-activities-subject";
import React from "react";
import { Locale } from "@/i18n";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const ClassWorkPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
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
