import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface AccessSchoolVideosProps {
  auth?: AuthContext | null;
  lang?: Locale;
}
const AccessSchoolVideos = ({ auth, lang }: AccessSchoolVideosProps) => {
  return (
    <main className="">
      <div className=" border-"></div>
    </main>
  );
};

export default AccessSchoolVideos;
