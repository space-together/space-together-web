import { auth } from "@/auth";
import { Locale } from "@/i18n";

import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function StudentLayout(props: props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className="w-full">{children}</div>
  );
}
