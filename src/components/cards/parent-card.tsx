"use client";
import MyAvatar from "@/components/common/image/my-avatar";
import { LoadingIndicatorText } from "@/components/common/myLink";
import ParentModifySheet from "@/components/page/school-staff/parents-components/parent-modify-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  parent: ParentWithRelations;
}

const ParentCard = ({ auth, isSchoolStaff, parent, lang }: props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";

  const studentCount = parent.student_ids?.length || 0;

  return (
    <Card className=" p-0">
      <CardHeader className="relative border-b-0">
        <div className=" flex flex-row items-center gap-2">
          <MyAvatar src={parent.image} alt={parent.name} />
          <div>
            <LoadingIndicatorText
              className={"h6 line-clamp-1"}
              title={parent.name}
            >
              {parent.name}
            </LoadingIndicatorText>
            <LoadingIndicatorText
              className={"sm line-clamp-1"}
              title={parent.email}
            >
              {parent.email}
            </LoadingIndicatorText>
          </div>
        </div>
        <div>
          <div className=" mt-2">
            <div className=" flex flex-row flex-wrap gap-2">
              {parent.relationship && (
                <span className="sm">Relationship: {parent.relationship}</span>
              )}
              {parent.phone && <span className="sm">Phone: {parent.phone}</span>}
              <Badge variant={studentCount > 0 ? "default" : "outline"}>
                {studentCount} {studentCount === 1 ? "student" : "students"}
              </Badge>
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
            <ParentModifySheet
              lang={lang}
              auth={auth}
              parent={parent}
              isSchool
            />
          )}
          <Button
            library="daisy"
            variant={"primary"}
            className={cn("w-full", isSchoolStaff && "w-fit")}
            size="sm"
          >
            {"View parent"}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ParentCard;
