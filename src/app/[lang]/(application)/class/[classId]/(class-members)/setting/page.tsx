import { auth } from "@/auth";
import ClassNotFound from "@/components/app/class/class-not-found";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassSettingPage = async (props: props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  const getClass = await getClassById(classId);
  if (!getClass) return <ClassNotFound />;
  if (user.role !== "ADMIN") return redirect(`/${lang}/class/${classId}`);
  return (
    <div className=" py-4  w-full space-y-4">
      <div className=" space-y-2">
        <h2 className=" happy-title-head">General Settings</h2>
        <Separator />
      </div>
      <div className=" ">
        
      </div>
    </div>
  );
};

export default ClassSettingPage;
