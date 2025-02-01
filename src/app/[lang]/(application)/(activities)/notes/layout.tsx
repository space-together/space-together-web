import { auth } from "@/auth";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";
import NotesAside from "@/components/app/notes/notes-aside";
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
      <NotesAside lang={lang}/>
      <div className=" pl-80">{children}</div>
    </section>
  );
};

export default NotesLayout;
