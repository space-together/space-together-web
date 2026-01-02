"use client";
import MyAvatar from "@/components/common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import StudentModifySheet from "@/components/page/school-staff/students-components/student-modify-sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { calculateAge } from "@/lib/utils/format-date";
import { getInitialsUsername } from "@/lib/utils/generate-username";

interface props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  student: StudentWithRelations;
}

const StudentCard = ({ auth, isSchoolStaff, student, lang }: props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";

  return (
    <Card className=" p-0">
      <CardHeader className="relative border-b-0">
        <div className=" flex flex-row items-center gap-2">
          <MyAvatar src={student.image} alt={student.name} />
          <div>
            <MyLink href={`/${lang}/p/s/${student._id}`}>
              <LoadingIndicatorText
                className={"h6 line-clamp-1"}
                title={student.name}
              >
                {student.name}
              </LoadingIndicatorText>
            </MyLink>
            <MyLink href={`/${lang}/p/s/${student._id}`}>
              <LoadingIndicatorText
                className={"sm line-clamp-1"}
                title={student.email}
              >
                {student.email}
              </LoadingIndicatorText>
            </MyLink>
          </div>
        </div>
        <div>
          <div className=" mt-2">
            <div className=" flex flex-row flex-wrap gap-2">
              {student.gender && (
                <span className="sm">Gender: {student.gender}</span>
              )}
              {student.date_of_birth && (
                <span className="sm">
                  Age: {calculateAge(student.date_of_birth)}
                </span>
              )}
              {student.class && (
                <MyLink
                  href={`/${lang}/c/${student.class.username}`}
                  className=" flex "
                >
                  <LoadingIndicatorText
                    title={`Class: ${student.class.name}`}
                    className=" text-sm line-clamp-1 font-medium"
                  >
                    Class: {getInitialsUsername(student.class.name, true)}
                  </LoadingIndicatorText>
                </MyLink>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" p-0 pb-4 flex flex-col justify-between">
        <CardFooter
          className={cn(
            " border-t border-base-content/50 pb- bottom-0",
            isSchoolStaff && " flex flex-row justify-end gap-2",
          )}
        >
          {canModify && (
            <StudentModifySheet // server side component
              lang={lang}
              auth={auth}
              student={student}
              isSchool
            />
          )}
          <Button
            library="daisy"
            variant={"primary"}
            className={cn("w-full", isSchoolStaff && "w-fit")}
            role="page"
            href={`/${lang}/p/s/${student?._id}`}
            size="sm"
          >
            {"Vue student"}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
