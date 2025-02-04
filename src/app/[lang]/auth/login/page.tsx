import AuthProviders from "@/components/auth/authProviders";
import { LoginForm } from "@/components/auth/forms/login-form";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

interface Props {
  params : Promise<{lang : Locale}>
}

const Page = async (props : Props) => {
    const params = await props.params;
    const { lang } = params;
    const diction = await getDictionary(lang);

  return (
    <div  className=" h-screen px-16 flex flex-col items-start pt-4 happy-page gap-2">
       <div className=" space-y-2">
        <h1 className=" happy-title-head">
          {diction.auth.login.page.title}
        </h1>
        <p>
          {diction.auth.register.page.paragraph}{" "}
          <Link href={`/${lang}/auth/register`} className=" link link-info">
            {diction.auth.login.page.login}
          </Link>
        </p>
      </div>
      <div className=" mt-4 w-full space-y-3">
        <LoginForm lang={lang} diction={diction.auth.login.form}/>
        <AuthProviders lang={lang}/>
      </div>
    </div>
  );
};

export default Page;
