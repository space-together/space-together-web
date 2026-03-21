import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import LandingFooter from "./_components/common/landing-footer";
import LandingNav from "./_components/common/nav/landing-nav";

const LandingLayout = async (props: LayoutProps<"/[lang]">) => {
  const { children } = props;
  const { lang } = await props.params;
  const auth = await authContext();
  return (
    <div className="bg-base-200 min-h-screen">
      <LandingNav auth={auth} lang={lang as Locale} />
      <div className="pt-14">{children}</div>
      <LandingFooter lang={lang as Locale} />
    </div>
  );
};

export default LandingLayout;
