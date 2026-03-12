import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import AccessSchoolVideos from "./home-access-school/access-school-videos";
import AccessSchoolHeader from "./home-access-school/accesss-school-header";

interface HomeAccessSchoolProps {
  auth?: AuthContext | null;
  lang?: Locale;
}

const HomeAccessSchool = ({ auth, lang }: HomeAccessSchoolProps) => {
  return (
    <section className=" space-y-12 px-8">
      <AccessSchoolHeader auth={auth} lang={lang} />
      <AccessSchoolVideos auth={auth} lang={lang} />
    </section>
  );
};

export default HomeAccessSchool;
