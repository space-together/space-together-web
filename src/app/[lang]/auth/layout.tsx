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

  const leftImagesDiction = (await getDictionary(lang)).auth.leftSide;

  return (
    <section className=" bg-base-300">
      <AuthSetting lang={lang}/>
      <div className=" items-center justify-between flex min-h-screen w-full ">
        <AuthLayoutImage diction={leftImagesDiction} lang={lang}/>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
