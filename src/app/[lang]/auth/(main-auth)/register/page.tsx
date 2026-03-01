import MyLink from "@/components/common/myLink";
import AuthProviders from "@/components/page/auth/auth-provider";
import RegisterForm from "@/components/page/auth/forms/register-form";
import { getDictionary, type Locale } from "@/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "create an account",
  description: "Create an account on space-together",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const RegisterPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const diction = await getDictionary(lang);
  return (
    <div className=" h-screen flex flex-col items-start pt-4  gap-2">
      <div className=" w-full space-y-8 ">
        <MyLink href={`/${lang}/auth/login`} className="flex gap-2 justify-end">
          <p>{diction.auth.register.page.paragraph}</p>
          <span className=" link ">
            {diction.auth.register.page.login}
          </span>
        </MyLink>

        <h1 className=" happy-title-head">
          {diction.auth.register.page.title}
        </h1>
        <AuthProviders />
      </div>
      <main className=" mt-4 w-full space-y-3">
        <RegisterForm lang={lang} />
      </main>
          <MyLink href={`/${lang}/auth/login`} className="flex gap-2 ">
            <p>{diction.auth.register.page.paragraph}</p>
            <span className=" link ">
              {diction.auth.register.page.login}
            </span>
          </MyLink>

    </div>
  );
};

export default RegisterPage;
