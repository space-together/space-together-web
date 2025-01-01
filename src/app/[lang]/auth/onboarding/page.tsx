import OnboardingForm from "@/components/auth/forms/onboarding-form";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";

interface Props {
  params: Promise<{ lang: Locale }>;
}
const OnboardingPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const diction = await getDictionary(lang);
  return (
    <div className=" h-screen px-16 flex flex-col items-start pt-4 happy-page gap-2">
      <div className=" space-y-2">
        <h1 className=" happy-title-head">
          {diction.auth.onboarding.page.title}
        </h1>
        <p>{diction.auth.onboarding.page.paragraph} </p>
      </div>
      <div className="w-full">
        <OnboardingForm />
      </div>
    </div>
  );
};

export default OnboardingPage;
