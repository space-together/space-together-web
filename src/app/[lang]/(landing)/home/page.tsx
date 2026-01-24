import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import HomePageComponent from "./_components/home-page";

const HomePage = async (props: PageProps<"/[lang]/home">) => {
  const { lang } = await props.params;
  const auth = await authContext();
  return <HomePageComponent lang={lang as Locale} auth={auth} />;
};

export default HomePage;
