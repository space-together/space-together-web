import { auth } from "@/auth";
import ClassCard from "@/components/cards/class-card";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getStudentsByUserId } from "@/services/data/student-data";
import { redirect } from "next/navigation";
import { MdClass } from "react-icons/md";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const ClassIdPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;

  const currentUser = (await auth())?.user;
  if (!currentUser || !currentUser.id) return redirect(`/${lang}/auth/login`);
  if (currentUser.role !== "STUDENT" && currentUser.role !== "ADMIN") {
    return <PermissionPage />;
  }

  const getStudents = await getStudentsByUserId(currentUser.id);
  const classCards = await Promise.all(
    getStudents.map((student) => {
      const { class: myClass } = student;
      return <ClassCard key={student.id} lang={lang} myClass={myClass} />;
    })
  );
  return (
    <div className="py-4 space-y-4 px-4">
      {/* <div className=" space-y-2">
        <div className=" space-x-1 flex items-center">
          <FaSchool />
          <h2 className=" font-semibold">School</h2>
        </div>
        <div className=" grid grid-cols-3 gap-4">
          <SchoolCard isStudent lang={lang} />
          <SchoolCard isStudent lang={lang} />
          <SchoolCard isStudent lang={lang} />
        </div>
      </div> */}
      {!!getStudents && (
        <div className=" space-y-2">
          <div className=" space-x-1 flex items-center">
            <MdClass />
            <h2 className=" font-semibold">Classes</h2>
          </div>
          {getStudents.length === 0 ? (
            <div> no class you have</div>
          ) : (
            <div className=" grid grid-cols-3 gap-4">{classCards}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassIdPage;
