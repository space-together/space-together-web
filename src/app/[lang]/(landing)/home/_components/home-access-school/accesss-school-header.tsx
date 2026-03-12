import MyImage from "@/components/common/myImage";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface AccessSchoolHeaderProps {
  auth?: AuthContext | null;
  lang?: Locale;
}

const AccessSchoolHeader = ({ auth, lang }: AccessSchoolHeaderProps) => {
  return (
    <article className=" flex flex-col items-center gap-4">
      <MyImage
        className=" size-25"
        src="/icons/school-3d.png"
        alt="school 3d icon"
      />
      <div className=" flex flex-col justify-center items-center gap-2">
        <h2 className="h2 text-center">
          Bring your entire school together, <br /> everywhere.
        </h2>
        <p className=" p1 max-w-2xl text-center">
          From classrooms to announcements and collaboration, Space-Together
          helps schools manage learning, communication, and activities in one
          connected platform — accessible anytime, anywhere.
        </p>
      </div>
    </article>
  );
};

export default AccessSchoolHeader;
