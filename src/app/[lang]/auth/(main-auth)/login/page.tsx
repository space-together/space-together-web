import MyLink from "@/components/common/myLink";
import AuthProviders from "@/components/page/auth/auth-provider";
import LoginForm from "@/components/page/auth/forms/login-form";
import { getDictionary, type Locale } from "@/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Login in an account on space together",
};
interface props {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ oauthError?: string }>;
}

const LoginPage = async (props: props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const oauthError = searchParams.oauthError;
  const { lang } = params;
  const diction = await getDictionary(lang);
  return (
    <div className=" h-screen flex flex-col items-start pt-4 happy-page gap-2 w-full">
      <div className=" space-y-2 w-full flex flex-col">
        <MyLink href={`/${lang}/auth/register`} className="flex justify-end">
          {diction.auth.register.page.paragraph}{" "}
          <span className=" link">{diction.auth.login.page.login}</span>
        </MyLink>
        <h1 className=" happy-title-head">Login</h1>
        <AuthProviders />
      </div>
      <div className=" mt-4 w-full space-y-3">
        <LoginForm oauthError={oauthError} lang={lang} />
        <MyLink href={`/${lang}/auth/register`} className="flex ">
          {diction.auth.register.page.paragraph}{" "}
          <span className=" link">{diction.auth.login.page.login}</span>
        </MyLink>
      </div>
    </div>
  );
};

export default LoginPage;
