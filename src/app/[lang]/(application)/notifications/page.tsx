import { auth } from "@/auth";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const NotificationsPage = async(props: props) =>{
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div>
      notifaict
    </div>
  )
}

export default NotificationsPage
