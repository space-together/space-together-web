import { auth } from "@/auth";
import NotesNavbar from "@/components/app/notes/notes-navbar";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
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
    <section className="">
      <NotesNavbar lang={lang}/>
      {children}{" "}
    </section>
  );
};

export default NotesLayout;
