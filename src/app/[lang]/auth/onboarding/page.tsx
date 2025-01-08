import { auth } from "@/auth";
import OnboardingForm from "@/components/auth/forms/onboarding-form";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";
import { fetchAllUserRoles } from "@/utils/service/functions/fetchDataFn";

interface Props {
  params: Promise<{ lang: Locale }>;
}
const OnboardingPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const diction = await getDictionary(lang);
  const userRoles = await fetchAllUserRoles();

  if ("message" in userRoles) {
    return " hello"
  }

  const authResult = await auth();
  const user =
    authResult && authResult.user && typeof authResult.user.id === "string"
      ? { ...authResult.user, email: authResult.user.email || "" }
      : undefined;
      
  return (
    <div className=" h-screen px-16 flex flex-col items-start pt-4 happy-page gap-2">
      <div className=" space-y-2">
        <h1 className=" happy-title-head">
          {diction.auth.onboarding.page.title}
        </h1>
        <p>{diction.auth.onboarding.page.paragraph} </p>
      </div>
      <div className="w-full">
        <OnboardingForm
          user={user}
          userRoles={userRoles}
          dictionary={diction.auth.onboarding.form}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;

// Dependencies: pnpm install lucide-react
