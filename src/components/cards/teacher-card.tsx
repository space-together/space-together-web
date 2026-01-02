"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import SchoolTeacherModifySheet from "@/components/page/school-staff/school-teachers/school-teacher-modify-sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  teacher: TeacherWithRelations;
}

const TeacherCard = ({ auth, isSchoolStaff, teacher, lang }: Props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";

  return (
    <Card className="p-0">
      {/* HEADER */}
      <CardHeader className="border-b-0">
        <div className="flex items-center gap-2">
          <MyAvatar src={teacher.image} alt={teacher.name} />

          <div className="flex flex-col">
            <MyLink href={`/${lang}/p/t/${teacher._id}`}>
              <LoadingIndicatorText
                className="h6 line-clamp-1"
                title={teacher.name}
              >
                {teacher.name}
              </LoadingIndicatorText>
            </MyLink>

            <LoadingIndicatorText
              className="sm line-clamp-1"
              title={teacher.email}
            >
              {teacher.email}
            </LoadingIndicatorText>
          </div>
        </div>

        {/* META */}
        <div className="mt-2 flex flex-wrap gap-2">
          {teacher.gender && (
            <span className="sm">Gender: {teacher.gender}</span>
          )}

          {teacher.type && <span className="sm">Type: {teacher.type}</span>}

          <span className="sm">Classes: {teacher.classes?.length ?? 0}</span>
        </div>
      </CardHeader>

      {/* FOOTER */}
      <CardContent className="p-0 pb-4 flex flex-col justify-between">
        <CardFooter
          className={cn(
            "border-t border-base-content/50",
            isSchoolStaff && "flex justify-end gap-2",
          )}
        >
          {canModify && (
            <SchoolTeacherModifySheet
              lang={lang}
              auth={auth}
              teacher={teacher}
              isSchool
            />
          )}

          <Button
            library="daisy"
            variant="primary"
            size="sm"
            className={cn("w-full", isSchoolStaff && "w-fit")}
            role="page"
            href={`/${lang}/p/t/${teacher._id}`}
          >
            View teacher
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
