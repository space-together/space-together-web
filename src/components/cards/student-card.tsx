"use client";
import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import StudentModifySheet from "@/components/page/school-staff/students-components/student-modify-sheet";
import { Badge } from "@/components/ui/badge";
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
import { getInitialsUsername } from "@/lib/utils/generate-username";

interface props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  student?: StudentWithRelations;
}

const StudentCard = ({ auth, isSchoolStaff, student, lang }: props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";

  return (
    <Card className=" p-0">
      <CardHeader className="relative p-0 border-b-0">
        <MyImage
          src={
            student?.image
              ? student.image
              : student?.gender === "MALE"
                ? "/images/students/male.jpg"
                : "/images/students/female.jpg"
          }
          className="h-52 w-full  border-b border-base-content/50"
          classname=" card rounded-b-none"
        />
        <div className=" px-4 flex flex-col mt-1">
          <div className=" flex justify-between items-center">
            {student?.name && (
              <MyLink href={`/${lang}/p/s/${student._id}`}>
                <LoadingIndicatorText className=" font-medium">
                  {student.name}
                </LoadingIndicatorText>
              </MyLink>
            )}
            <Badge
              library="daisy"
              variant={student?.is_active ? "info" : "error"}
              size={"sm"}
            >
              Active
            </Badge>
          </div>

          {student?.registration_number && (
            <span
              title={`Student code: ${student.registration_number}`}
              className=" text-primary"
            >
              {student.registration_number}
            </span>
          )}
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
          >
            {"Vue student"}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
