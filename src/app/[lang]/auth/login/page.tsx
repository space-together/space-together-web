import AuthProviders from "@/components/auth/authProviders";
import { LoginForm } from "@/components/auth/forms/login-form";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

interface Props {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ oauthError?: string }>;
}

const Page = async ({params, searchParams}: Props) => {
  const lang = (await params).lang;
  const oauthError = (await searchParams).oauthError
  const diction = await getDictionary(lang);

  return (
    <div className=" h-screen px-16 flex flex-col items-start pt-4 happy-page gap-2 w-full">
      <div className=" space-y-2">
        <h1 className=" happy-title-head">{diction.auth.login.page.title}</h1>
      </div>
      <div className=" mt-4 w-full space-y-3">
        <LoginForm oauthError={oauthError} lang={lang} diction={diction.auth.login.form} />
        <p>
          {diction.auth.register.page.paragraph}{" "}
          <Link href={`/${lang}/auth/register`} className=" link link-info">
            {diction.auth.login.page.login}
          </Link>
        </p>
        <AuthProviders lang={lang} />
      </div>
    </div>
  );
};

export default Page;
