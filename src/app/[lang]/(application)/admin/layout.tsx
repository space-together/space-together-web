import { getCurrentUser } from "@/services/auth/core/current-user";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function Layout(props: props) {
  const params = await props.params;

  const { lang } = params;
  const { children } = props;

  const user = await getCurrentUser({ authUser: true })
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return <section className="">{children}</section>;
}
