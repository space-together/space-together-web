import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import LandingNav from "./_components/common/nav/landing-nav";

const LandingLayout = async (props: LayoutProps<"/[lang]">) => {
  const { children } = props;
  const { lang } = await props.params;
  const auth = await authContext();
  return (
    <div className=" bg-base-200">
      <LandingNav auth={auth} lang={lang as Locale} />
      {children}
    </div>
  );
};

export default LandingLayout;
