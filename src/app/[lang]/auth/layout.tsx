import AuthLayoutImage from "@/components/auth/authLayoutImage";
import AuthSetting from "@/components/auth/nav/authSetting";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const AuthLayout = async (props: Props) => {
  const params = await props.params;

  const { lang } = params;
  const { children } = props;

  const auth = await getDictionary(lang);

  return (
    <section className=" bg-base-300">
      <AuthSetting lang={lang} diction={auth.auth.setting}/>
      <div className=" items-center justify-between flex min-h-screen w-full ">
        <AuthLayoutImage diction={auth.auth.leftSide} lang={lang}/>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
