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
import type { Student } from "@/lib/schema/student/student-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { calculateAge } from "@/lib/utils/format-date";
import { getInitialsUsername } from "@/lib/utils/generate-username";

interface props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  student: Student;
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
            </div>
          </div>
        </div>
        <div className=" px-4 flex flex-col mt-1">
          {/* student class */}
          {student?.class && (
            <MyLink
              href={`/${lang}/c/${student.class.username}`}
              className=" flex gap-2 mt-2 items-center"
            >
              <MyAvatar
                src={student.class.image}
                alt={student.class.name}
                type="square"
                size="xs"
                isSubClass
              />
              <span
                title={student.class.name}
                className=" text-sm line-clamp-1 "
              >
                {getInitialsUsername(student.class.name, true)}
              </span>
            </MyLink>
          )}
        </div>
      </CardHeader>
      <CardContent className=" p-0 pb-4 flex flex-col justify-between">
        <div className=" px-4 flex flex-wrap gap-4"></div>

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
