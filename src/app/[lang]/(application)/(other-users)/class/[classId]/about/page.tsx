import ClassAbout from "@/components/app/class/about/class-about";
import ClassPeople from "@/components/app/class/about/class-people";
import ClassHead from "@/components/app/class/classHead";
import { Locale } from "@/i18n";
import React from "react";
interface Props {
  params: Promise<{ lang: Locale }>;
}

const ClassAboutPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" px-4">
      <ClassHead lang={lang} />
      <div className=" pt-32 flex space-x-4 w-full justify-between">
        <div className="  w-1/2">
          <ClassAbout />
        </div>
        <div className=" w-1/2">
          <ClassPeople />
        </div>
      </div>
    </div>
  );
};

export default ClassAboutPage;
