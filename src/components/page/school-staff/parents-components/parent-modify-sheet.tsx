"use client";

import MyAvatar from "@/components/common/image/my-avatar";
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

import NotFoundImage from "@/components/common/image/not-found-image";
import { OpenImages } from "@/components/common/image/open-images";
import ParentDialog from "@/components/page/parent/dialogs/parent-dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { splitCamelCase } from "@/lib/helpers/format-text";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import type { Student } from "@/lib/schema/student/student-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface Props {
  parent: ParentWithRelations;
  auth: AuthContext;
  isTable?: boolean;
  lang: Locale;
  isSchool?: boolean;
}

const ParentModifySheet = ({
  parent,
  auth,
  isTable,
  lang,
  isSchool,
}: Props) => {
  const studentCount = parent.student_ids?.length || 0;
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (studentCount > 0) {
        const params = new URLSearchParams();
        parent.student_ids?.forEach((id) =>
          params.append("by_ids", String(id)),
        );
        try {
          const res = await apiRequest<void, Paginated<Student>>(
            "get",
            `/school/students?${params.toString()}`,
            undefined,
            {
              token: auth.token,
              schoolToken: auth.schoolToken,
            },
          );
          if (res?.data?.data) {
            setStudents(res.data.data);
          }
        } catch (err) {
          console.error("Failed to fetch students by IDs", err);
        } finally {
          setLoadingOptions(false);
        }
      }
    };

    fetchStudents();
  }, []);

  return (
    <Sheet isPublic>
      <SheetTrigger asChild>
        {isTable ? (
          <Button library="daisy" variant={"ghost"} size={"sm"}>
            <div className="flex items-center space-x-3">
              <MyAvatar src={parent?.image} alt={parent?.name} size="sm" />
              <div className="flex flex-col items-start overflow-hidden">
                {parent?.name || "N/A"}
                {parent?.email && (
                  <span
                    className="text-muted-foreground truncate text-sm"
                    title={parent.email}
                  >
                    {parent.email}
                  </span>
                )}
              </div>
            </div>
          </Button>
        ) : (
          <Button library="daisy" variant={"outline"} size="sm">
            Modify parent
          </Button>
        )}
      </SheetTrigger>

      <SheetContent isPublic className="gap-4">
        {/* ===== HEADER ===== */}
        <SheetHeader className="p-0 relative">
          <div className="relative">
            {parent?.image ? (
              <OpenImages className="w-full h-64" images={[parent?.image]} />
            ) : (
              <NotFoundImage className="w-full h-64" />
            )}

            <div className="space-x-1 p-4">
              <div className="flex justify-between">
                {parent?.name && (
                  <LoadingIndicatorText className="h5">
                    {parent.name}
                  </LoadingIndicatorText>
                )}
                <Badge
                  library="daisy"
                  variant={parent?.is_active ? "info" : "error"}
                >
                  {parent?.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              {parent?.user?.username && (
                <MyLink
                  className="line-clamp-1 flex space-x-1 link link-hover"
                  href={`/p/${parent.user.username}`}
                >
                  <span>@</span>
                  <span>{parent.user.username}</span>
                </MyLink>
              )}

              {/* INFO GRID */}
              <div className="grid grid-cols-2 mt-4 gap-y-1 gap-x-2">
                {parent?.email && (
                  <div className="flex gap-2">
                    <span>Email:</span>
                    <span className="font-medium">{parent.email}</span>
                  </div>
                )}
                {parent?.phone && (
                  <div className="flex gap-2">
                    <span>Phone:</span>
                    <span className="font-medium">{parent.phone}</span>
                  </div>
                )}

                {parent?.gender && (
                  <div className="flex gap-2">
                    <span>Gender:</span>
                    <span className="font-medium">
                      {splitCamelCase(parent.gender)}
                    </span>
                  </div>
                )}

                {parent?.relationship && (
                  <div className="flex gap-2">
                    <span>Relationship:</span>
                    <span className="font-medium">
                      {parent.relationship.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                )}

                {parent?.occupation && (
                  <div className="flex gap-2">
                    <span>Occupation:</span>
                    <span className="font-medium">{parent.occupation}</span>
                  </div>
                )}

                {parent?.national_id && (
                  <div className="flex gap-2">
                    <span>National ID:</span>
                    <span className="font-medium">{parent.national_id}</span>
                  </div>
                )}
              </div>

              {/* USER INFO */}
              {parent?.user && (
                <div className="flex gap-2 mt-4 items-center">
                  <MyAvatar
                    src={parent.user.image}
                    alt={parent.user.name}
                    size="sm"
                  />
                  <div className="flex flex-col gap-0">
                    <p className="font-medium leading-4">{parent.user.name}</p>
                    <MyLink
                      href={`/${lang}/p/${parent.user.username}`}
                      className="link link-hover text-sm leading-3"
                    >
                      @{parent.user.username}
                    </MyLink>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 px-4 flex justify-start flex-wrap gap-2">
              <ParentDialog isSchool={isSchool} auth={auth} parent={parent} />
              {parent?.user?.username && (
                <Button
                  library="daisy"
                  variant={"primary"}
                  className={cn("w-fit")}
                  role="page"
                  size={"sm"}
                  href={`/${lang}/p/${parent.user.username}`}
                >
                  View Parent
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>
        <Separator />
        {/* ===== MAIN CONTENT ===== */}
        <main className="px-4">
          <div className="space-y-4 flex-col flex">
            <Label>Connected Students</Label>
            {studentCount > 0 ? (
              <div className="space-y-2">
                <Badge variant="default">
                  {studentCount} {studentCount === 1 ? "student" : "students"}{" "}
                  connected
                </Badge>
                {parent?.students && parent.students.length > 0 && (
                  <div className="grid gap-2">
                    {parent.students.map((student) => (
                      <div
                        key={student.id || student._id}
                        className="flex items-center gap-2 p-2 border rounded"
                      >
                        <MyAvatar
                          src={student.image}
                          alt={student.name}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{student.name}</span>
                          {student.email && (
                            <span className="text-sm text-muted-foreground">
                              {student.email}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h6 className="text-base-content/50">
                  No students connected yet
                </h6>
                <p className="text-sm text-muted-foreground">
                  Use the modify button to connect students to this parent.
                </p>
              </div>
            )}
          </div>
        </main>

        <SheetFooter className="h-screen">
          <div className="h-screen" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ParentModifySheet;
