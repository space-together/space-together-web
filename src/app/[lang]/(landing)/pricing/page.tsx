import type { Locale } from "@/i18n";
import { PricingPageClient } from "./pricing-page-client";

const PricingPage = async (props: PageProps<"/[lang]/pricing">) => {
  const { lang } = await props.params;
  return <PricingPageClient lang={lang as Locale} />;
};

export default PricingPage;
