import { AuthChangeLanguages } from "@/components/auth/authChangeLanguages";
import AuthLayoutImage from "@/components/auth/authLayoutImage";
import AuthChangeTheme from "@/components/auth/nav/auth-theme";
import { Locale } from "@/i18n";

interface Props {
  children: React.ReactNode;
  param : {lang : Locale}
}

const AuthLayout = ({ children, param : {lang} }: Props) => {
  return (
    <section className=" bg-base-300">
      <AuthChangeTheme />
      <AuthChangeLanguages lang={lang}/>
      <div className=" items-center justify-between flex min-h-screen w-full ">
      <AuthLayoutImage />
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
