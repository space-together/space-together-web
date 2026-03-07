import NotFoundPage from "@/components/page/not-found";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

export default async function ParentLayout(
  props: LayoutProps<"/[lang]/pr">,
) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (auth.user.role !== "PARENT") {
    return (
      <NotFoundPage message="You need to have parent role to view this page" />
    );
  }

  if (!auth.school) {
    return (
      <NotFoundPage message="You need to be associated with a school to view this page" />
    );
  }

  return <>{children}</>;
}
