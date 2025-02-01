import { auth } from "@/auth";
import NotesBody from "@/components/app/notes/notes-body";
import NotesHeader from "@/components/app/notes/notes-header";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";
interface props {
  params: Promise<{ lang: Locale }>;
}
const ClassNotesIdPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" min-h-screen">
      <NotesHeader lang={lang} />
      <div className=" px-4">
        <NotesBody />
        
      </div>
    </div>
  );
};

export default ClassNotesIdPage;
