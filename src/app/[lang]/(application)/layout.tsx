import { auth } from "@/auth";
import AppNavbar from "@/components/site/navbar/app-navbar";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ApplicationLayout(props: props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div>
      <AppNavbar
        user={{
          ...user,
          name: user.name ?? "",
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        }}
        lang={lang}
      />
      <div className=" pt-14">{children}</div>
    </div>
  );
}
