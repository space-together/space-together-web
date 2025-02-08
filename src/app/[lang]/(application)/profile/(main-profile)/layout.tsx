import { auth } from "@/auth";
import ProfileHeader from "@/components/app/profile/profile-header";
import ProfileNavBar from "@/components/app/profile/profile-navbar";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const MainProfileLayout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <section>
      <div className=" px-4 space-y-4 w-full pb-4">
        <ProfileHeader lang={lang} />
        <ProfileNavBar lang={lang}/>
      </div>
      {children}
    </section>
  );
};

export default MainProfileLayout;
