import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import HomeAccessSchool from "./home-access-school";
import HomeAfricaFirst from "./home-africa-first";
import HomeFeaturesGrid from "./home-features-grid";
import HomeFinalCta from "./home-final-cta";
import HomeHero from "./home-hero";
import HomeHowItWorks from "./home-how-it-works";
import HomeProblemSolution from "./home-problem-solution";
import HomeSocialProof from "./home-social-proof";
import HomeTestimonials from "./home-testimonials";
import HomeUseCases from "./home-use-cases";

interface HomePageComponentProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const HomePageComponent = ({ auth, lang }: HomePageComponentProps) => {
  return (
    <div className="min-h-screen">
      <HomeHero auth={auth} lang={lang} />
      <HomeSocialProof />
      <HomeProblemSolution />
      <HomeFeaturesGrid />
      <HomeHowItWorks />
      <HomeAccessSchool auth={auth} lang={lang} />
      <HomeUseCases />
      <HomeTestimonials />
      <HomeAfricaFirst />
      <HomeFinalCta lang={lang} />
    </div>
  );
};

export default HomePageComponent;
