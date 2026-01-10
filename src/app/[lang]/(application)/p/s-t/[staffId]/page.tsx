import DevelopingPage from "@/components/page/developing-page";
import type { Locale } from "@/i18n";

const SchoolStaffProfile = async (
  props: PageProps<"/[lang]/p/s-t/[staffId]">,
) => {
  const { lang } = await props.params;
  return <DevelopingPage lang={lang as Locale} />;
};

export default SchoolStaffProfile;
