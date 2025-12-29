import AnnouncementCard from "@/components/common/cards/announcement-card";
import { Card } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import ClassesTable from "../class/class-table";
import SubjectsTable from "../class/subjects-table";
import TeacherTimetable from "../timetable/time-table";

interface TeacherDashboardContentProps {
  auth: AuthContext;
  lang: Locale;
}

const TeacherDashboardContent = ({
  auth,
  lang,
}: TeacherDashboardContentProps) => {
  return (
    <div className=" space-y-2">
      <Card className=" p-6">
        <TeacherTimetable />
      </Card>
      <div className=" flex space-x-2">
        <div className="w-full space-y-2">
          {[...Array(3)].map((_, index) => {
            return <AnnouncementCard auth={auth} key={index} />;
          })}
        </div>
        <div className=" w-1/2 space-y-2">
          <Card className=" p-6">
            <ClassesTable />
          </Card>
          <Card className=" p-6">
            <SubjectsTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardContent;
