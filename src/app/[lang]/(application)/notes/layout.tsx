import { auth } from "@/auth";
import MessagesAsideLeftNavbar from "@/components/app/messages/message-aside-left-navbar";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const NotesLayout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <section className=" flex">
      <MessagesAsideLeftNavbar className=" fixed" lang={lang} />
      <div className=" pl-16">{children}</div>
    </section>
  );
};

export default NotesLayout;
