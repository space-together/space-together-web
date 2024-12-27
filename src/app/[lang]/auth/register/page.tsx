import RegisterForm from "@/components/auth/forms/register-form";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";
import { fetchAllUserRoles } from "@/utils/service/functions/fetchDataFn";
import Link from "next/link";

interface Props {
  params : Promise<{lang : Locale}>
}
const RegisterPage =async (props : Props) => {
  const params = await props.params;
  const {lang} = params;
  const diction = await getDictionary(lang);
  const userRoles = await fetchAllUserRoles();
  return (
    <div className=" h-screen p-16 flex flex-col items-start pt-8 happy-page">
      <div className=" space-y-2">
        <h1 className=" happy-title-head">{diction.auth.register.page.title}</h1>
        <p>{diction.auth.register.page.paragraph} <Link href={`/${lang}/auth/login`} className=" link link-info">{diction.auth.register.page.login}</Link></p>
      </div>
      <div className=" mt-8 w-full">
        <RegisterForm userRoles={userRoles} diction={diction.auth.register.form}/>
      </div>
    </div>
  );
};

export default RegisterPage;
