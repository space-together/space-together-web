import AuthLayoutImage from "@/components/auth/authLayoutImage";
import AuthLayoutChildren from "@/components/auth/layout-children";
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
    <section className=" w-full">
      <AuthSetting lang={lang} diction={diction.auth.setting} />
      <div className="flex w-full">
        <AuthLayoutImage diction={diction.auth.leftSide} lang={lang} />
        <AuthLayoutChildren lang={lang}>
          {children}
        </AuthLayoutChildren>
      </div>
    </section>
  );
};

export default AuthLayout;
