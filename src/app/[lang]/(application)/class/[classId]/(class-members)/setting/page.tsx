import { auth } from "@/auth";
import { UpdateClassForm } from "@/components/form/update-class-form";
import NotFoundPage from "@/components/page/not-found-page";
import PermissionPage from "@/components/page/permission-page";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { redirect } from "next/navigation";
 
interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassSettingPage = async ({ params }: Props) => {
  const { lang, classId } = await params;
  const user = (await auth())?.user;

  // Redirect to login if the user is not authenticated
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  const getClass = await getClassById(classId);

  if (!getClass) return <NotFoundPage />;
  if (user.role !== "ADMIN" && getClass.user_id !== user.id)
    return <PermissionPage />;

  return (
    <div className="p-4 w-full space-y-4 ">
      <div className="space-y-2">
        <h2 className="happy-title-head">General Settings</h2>
        <Separator />
      </div>
      <div className="space-y-4">
        <h3 className=" happy-title-base">Public </h3>
        <UpdateClassForm  classId={classId} currentClass={getClass}/>
      </div>
      <Separator />
      <div>
        <h3 className="happy-title-base">Class codes</h3>
        <div></div>
      </div>
    </div>
  );
};

export default ClassSettingPage;
