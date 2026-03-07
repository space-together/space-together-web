import MyLink from "@/components/common/myLink";
import AuthProviders from "@/components/page/auth/auth-provider";
import LoginForm from "@/components/page/auth/forms/login-form";
import { getDictionary, type Locale } from "@/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Login in an account on space together",
};

const LoginPage = async (props: PageProps<"/[lang]/auth/login">) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { oauthError, callbackUrl } = searchParams;
  const { lang } = params;
  const diction = await getDictionary(lang as Locale);
  return (
    <div className=" h-screen flex flex-col items-start pt-4 happy-page gap-2 w-full">
      <div className=" space-y-2 w-full flex flex-col">
        <MyLink href={`/${lang}/auth/register`}  className="flex justify-end">
          {diction.auth.register.page.paragraph}{" "}
          <span className=" link">
            {diction.auth.login.page.login}
          </span>
        </MyLink>
        <h1 className=" happy-title-head">Login</h1>
        <AuthProviders />
      </div>
      <div className=" mt-4 w-full space-y-3">
<<<<<<< HEAD
        <LoginForm
          oauthError={oauthError as string}
          lang={lang as Locale}
          callbackUrl={callbackUrl as string}
        />
        <p>
=======
        <LoginForm oauthError={oauthError} lang={lang} />
        <MyLink href={`/${lang}/auth/register`}  className="flex ">
>>>>>>> 62f29a63e347b5689602798713c1a7f15f41b2be
          {diction.auth.register.page.paragraph}{" "}
          <span className=" link">
            {diction.auth.login.page.login}
          </span>
        </MyLink>
      </div>
    </div>
  );
};

export default LoginPage;
