"use client";
import { useState } from "react";

import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import StudentDialog from "@/components/page/student/dialogs/student-dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { splitCamelCase } from "@/lib/helpers/format-text";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  student?: StudentWithRelations;
  auth: AuthContext;
  isTable?: boolean;
  lang?: Locale;
  isSchool?: boolean;
}

const StudentModifySheet = ({
  student,
  auth,
  isTable,
  lang,
  isSchool,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Sheet isPublic>
      <SheetTrigger asChild>
        {isTable ? (
          <Button library="daisy" variant={"ghost"} size={"sm"}>
            <div className="flex items-center space-x-3">
              <MyAvatar src={student?.image} alt={student?.name} size="sm" />
              <div className="flex flex-col items-start overflow-hidden">
                {student?.name || "N/A"}
                {student?.email && (
                  <span
                    className="text-muted-foreground truncate text-sm"
                    title={student.email} // Add title attribute
                  >
                    {student.email}
                  </span>
                )}
              </div>
            </div>
          </Button>
        ) : (
          <Button library="daisy" variant={"outline"}>
            Modify student
          </Button>
        )}
      </SheetTrigger>

      <SheetContent isPublic className="gap-4">
        {/* ===== HEADER ===== */}
        <SheetHeader className="p-0 relative">
          <div className="relative">
            <MyImage
              src={
                student?.image
                  ? student.image
                  : student?.gender === "MALE"
                    ? "/images/students/male.jpg"
                    : "/images/students/female.jpg"
              }
              className="w-full h-64"
            />

            <div className="space-x-1 p-4">
              <div className="flex justify-between">
                {student?.name && (
                  <MyLink href={`/${lang}/p/s/${student._id}`}>
                    <LoadingIndicatorText className="h5">
                      {student.name}
                    </LoadingIndicatorText>
                  </MyLink>
                )}
                <Badge
                  library="daisy"
                  variant={student?.is_active ? "info" : "error"}
                >
                  {student?.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              {student?.registration_number && (
                <span className=" text-primary">
                  {student.registration_number}
                </span>
              )}

              {student?.user?.username && (
                <MyLink
                  className="line-clamp-1 flex space-x-1 link link-hover"
                  href={`/p/${student.user.username}`}
                >
                  <span>@</span>
                  <span>{student.user.username}</span>
                </MyLink>
              )}

              {/* INFO GRID */}
              <div className="grid grid-cols-2 mt-4 gap-y-1 gap-x-2">
                {student?.email && (
                  <div className="flex gap-2">
                    <span>Email:</span>
                    <span className="font-medium">{student.email}</span>
                  </div>
                )}
                {student?.phone && (
                  <div className="flex gap-2">
                    <span>Phone:</span>
                    <span className="font-medium">{student.phone}</span>
                  </div>
                )}

                {student?.gender && (
                  <div className="flex gap-2">
                    <span>Gender:</span>
                    <span className="font-medium">
                      {splitCamelCase(student.gender)}
                    </span>
                  </div>
                )}
              </div>

              {/* USER INFO */}
              {student?.user && (
                <div className="flex gap-2 mt-4 items-center">
                  <MyAvatar
                    src={student.user.image}
                    alt={student.user.name}
                    size="sm"
                  />
                  <div className="flex flex-col gap-0">
                    <p className="font-medium leading-4">{student.user.name}</p>
                    <MyLink
                      href={`/${lang}/p/${student.user.username}`}
                      className="link link-hover text-sm leading-3"
                    >
                      @{student.user.username}
                    </MyLink>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 px-4 flex justify-start flex-wrap gap-2">
              <StudentDialog
                isSchool={isSchool}
                auth={auth}
                student={student}
              />
              {student?.user?.username && (
                <Button
                  library="daisy"
                  variant={"primary"}
                  className={cn("w-fit")}
                  role="page"
                  size={"sm"}
                  href={`/${lang}/p/${student.user.username}`}
                >
                  View Student
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>
        <Separator />
        {/* ===== MAIN CONTENT ===== */}
        <main className="px-4">
          {student.class ? (
            <div className=" space-y-4 flex-col flex">
              <Label>Class</Label>
              {student?.class && (
                <MyLink
                  className=" underline-offset-0"
                  href={`/${lang}/c/${student.class.username}`}
                >
                  <div className=" flex gap-2 items-center">
                    <MyAvatar
                      src={student?.class?.image}
                      isSubClass
                      alt={student.class.name}
                      size={"sm"}
                    />
                    <span title={student.class.name}>{student.class.name}</span>
                  </div>
                </MyLink>
              )}
            </div>
          ) : (
            <div>no class student have</div>
          )}
        </main>

        <SheetFooter className="h-screen">
          <div className="h-screen" />
          app footer
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StudentModifySheet;
