import { auth } from "@/auth";
import AsideActivities from "@/components/cards/aside-activities";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const layout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div>
      <AsideActivities
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
        lang={lang}
      />
      <div className=" pl-16 ">{children}</div>
    </div>
  );
};

export default layout;
