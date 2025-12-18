import SubjectTemplateForm from "@/components/page/admin/tempate-subject/subject-template-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

export default async function SchoolCalendar(
  props: PageProps<"/[lang]/test/pages">,
) {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" px-4 py-4 space-y-4 min-h-screen grid place-content-center w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Subject card</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectTemplateForm auth={auth} />
        </CardContent>
      </Card>
    </div>
  );
}
