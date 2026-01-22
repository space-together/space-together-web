"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  staff: SchoolStaff;
}

const SchoolStaffCard = ({ auth, isSchoolStaff, staff, lang }: Props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";

  return (
    <Card className="p-0">
      {/* HEADER */}
      <CardHeader className="border-b-0">
        <div className="flex items-center gap-2">
          <MyAvatar alt={staff.name} />

          <div className="flex flex-col">
            <MyLink href={`/${lang}/p/staff/${staff._id}`}>
              <LoadingIndicatorText
                className="h6 line-clamp-1"
                title={staff.name}
              >
                {staff.name}
              </LoadingIndicatorText>
            </MyLink>

            <LoadingIndicatorText
              className="sm line-clamp-1"
              title={staff.email}
            >
              {staff.email}
            </LoadingIndicatorText>
          </div>
        </div>

        {/* META */}
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="sm">
            Role:{" "}
            {staff.type === "Director"
              ? "Director"
              : staff.type === "HeadOfStudies"
                ? "Head of Studies"
                : "N/A"}
          </span>

          <span className="sm">
            Status: {staff.is_active ? "Active" : "Inactive"}
          </span>

          <span className="sm">Tags: {staff.tags?.length ?? 0}</span>
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
          {/*{canModify && (
            <SchoolStaffModifySheet
              lang={lang}
              auth={auth}
              staff={staff}
              isSchool
            />
          )}*/}

          <Button
            library="daisy"
            variant="primary"
            size="sm"
            className={cn("w-full", isSchoolStaff && "w-fit")}
            role="page"
            href={`/${lang}/p/staff/${staff._id}`}
          >
            View staff
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default SchoolStaffCard;
