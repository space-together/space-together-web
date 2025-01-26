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

  const diction = await getDictionary(lang);

  return (
    <section className="">
      <AuthSetting lang={lang} diction={diction.auth.setting}/>
      <div className=" items-center justify-between flex min-h-screen w-full">
        <AuthLayoutImage diction={diction.auth.leftSide} lang={lang}/>
       <div className=" w-1/2 right-0 absolute">
        {children}
       </div>
      </div>
    </section>
  );
};

export default AuthLayout;
