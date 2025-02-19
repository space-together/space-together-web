import PostCard from "@/components/cards/post-card";
import SearchNotesClass from "@/components/app/class/notes/search-notes-class";
import SelectNoteSubject from "@/components/app/class/notes/search-notes-subject";
 import { Locale } from "@/i18n";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
interface props {
  params: Promise<{ lang: Locale }>;
}

const NotesPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" happy-page">
      <h1 className=" happy-title-head">Notes</h1>
      <Separator />
      <SearchNotesClass />
      <div className=" space-y-4 mt-3">
        <SelectNoteSubject />
        <div className=" space-y-2">
          <h5 className=" text-lg font-medium">All Notes</h5>
          <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PostCard lang={lang} postRole="NOTES" />
            <PostCard lang={lang} postRole="NOTES" />
            <PostCard lang={lang} postRole="NOTES" />
            <PostCard lang={lang} postRole="NOTES" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
