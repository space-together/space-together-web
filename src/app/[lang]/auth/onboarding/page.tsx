import OnboardingForm from "@/components/auth/forms/onboarding-form";
import MyLink from "@/components/my-components/my-link";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getCurrentUser } from "@/services/auth/core/current-user";
import { LogIn } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Update user information",
};

interface Props {
  params: Promise<{ lang: Locale }>;
}
const OnboardingPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const diction = await getDictionary(lang);

  const currentUser = await getCurrentUser({ authUser: true });

  return (
    <div className=" h-screen px-12 flex flex-col items-start pt-4 happy-page gap-2">
      <div className=" space-y-2">
        <h1 className=" happy-title-head">
          {diction.auth.onboarding.page.title}
        </h1>
        <p>{diction.auth.onboarding.page.paragraph} </p>
      </div>
      <div className="w-full">
        {currentUser ? (
          <OnboardingForm
            lang={lang}
            user={currentUser}
            dictionary={diction.auth.onboarding.form}
          />
        ) : (
          <div className=" flex flex-col justify-center items-center">
            <h2 className=" happy-title-base">
              Use mut to be login to update user account
              <div>
                <MyLink
                  href="/"
                  type="button"
                  button={{ variant: "info", size: "lg" }}
                >
                  <LogIn />
                  Login
                </MyLink>
              </div>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;