import { auth } from "@/auth";
import {
  ClassSettingName,
  ClassSettingSymbol,
  ClassSettingUsername,
} from "@/components/app/class/setting/class-setting-name";
import NotFoundPage from "@/components/page/not-found-page";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassSettingPage = async ({ params }: Props) => {
  const { lang, classId } = await params;
  const user = (await auth())?.user;

  // Redirect to login if the user is not authenticated
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  const getClass = await getClassById(classId);
  
  // Show "Class Not Found" if the class does not exist
  if (!getClass) return <NotFoundPage />;

  // Allow access only if the user is an ADMIN or the class owner
  if (user.role !== "ADMIN" && getClass.userId !== user.id) {
    return redirect(`/${lang}/class/${classId}`);
  }

  return (
    <div className="py-4 w-full space-y-4">
      <div className="space-y-2">
        <h2 className="happy-title-head">General Settings</h2>
        <Separator />
      </div>
      <div className="space-y-4">
        <ClassSettingName getClass={getClass} />
        <ClassSettingUsername getClass={getClass} />
        <ClassSettingSymbol getClass={getClass} />
      </div>
      <Separator />
      <div>
        <h3 className="happy-title-base">Class codes</h3>
        <div></div>
      </div>
    </div>
  );
};

export default ClassSettingPage;
