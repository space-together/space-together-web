import type { Locale } from "@/i18n";
import { redirectContents } from "@/lib/hooks/redirect";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";
import HomePageComponent from "./home/_components/home-page";

const WelcomePage = async (props: PageProps<"/[lang]">) => {
  const [params, auth] = await Promise.all([props.params, authContext()]);
  const { lang } = params;

  if (auth?.user) {
    redirect(
      redirectContents({
        lang: lang as Locale,
        role: auth?.user.role || "STUDENT",
      }),
    );
  }
  return <HomePageComponent auth={auth} lang={lang as Locale} />;
};

export default WelcomePage;
