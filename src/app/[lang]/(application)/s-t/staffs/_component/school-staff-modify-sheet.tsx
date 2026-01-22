"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import NotFoundImage from "@/components/common/image/not-found-image";
import { OpenImages } from "@/components/common/image/open-images";
import type { Locale } from "@/i18n";
import { splitCamelCase } from "@/lib/helpers/format-text";
import type { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import SchoolStaffDialog from "./school-staff-dialog";

interface Props {
  staff?: SchoolStaff;
  auth: AuthContext;
  isTable?: boolean;
  lang: Locale;
  isSchool?: boolean;
}

const SchoolStaffModifySheet = ({
  staff,
  auth,
  isTable,
  lang,
  isSchool,
}: Props) => {
  return (
    <Sheet isPublic>
      <SheetTrigger asChild>
        {isTable ? (
          <Button library="daisy" variant="ghost" size="sm">
            <div className="flex items-center space-x-3">
              <MyAvatar src={staff?.image} alt={staff?.name} size="sm" />
              <div className="flex flex-col items-start overflow-hidden">
                {staff?.name || "N/A"}
                {staff?.email && (
                  <span
                    className="text-muted-foreground truncate text-sm"
                    title={staff.email}
                  >
                    {staff.email}
                  </span>
                )}
              </div>
            </div>
          </Button>
        ) : (
          <Button library="daisy" size="sm" variant="outline">
            Modify staff
          </Button>
        )}
      </SheetTrigger>

      <SheetContent isPublic className="gap-4">
        {/* ===== HEADER ===== */}
        <SheetHeader className="p-0 relative">
          <div className="relative">
            {staff?.image ? (
              <OpenImages className="w-full h-64" images={[staff.image]} />
            ) : (
              <NotFoundImage className="w-full h-64" />
            )}

            <div className="space-x-1 p-4">
              <div className="flex justify-between">
                {staff?.name && (
                  <h3
                    className="line-clamp-1 leading-5 font-medium text-lg"
                    title={staff.name}
                  >
                    {staff.name}
                  </h3>
                )}

                <Badge
                  library="daisy"
                  variant={staff?.is_active ? "info" : "error"}
                >
                  {staff?.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* INFO GRID */}
              <div className="grid grid-cols-1 mt-4 gap-y-1 gap-x-2">
                {staff?.email && (
                  <div className="flex gap-2">
                    <span>Email:</span>
                    <span className="font-medium">{staff.email}</span>
                  </div>
                )}

                {staff?.type && (
                  <div className="flex gap-2">
                    <span>Role:</span>
                    <span className="font-medium">
                      {splitCamelCase(staff.type)}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <span>Tags:</span>
                  <span className="font-medium">
                    {staff?.tags?.length ?? 0}
                  </span>
                </div>
              </div>
            </div>

            {/* DATES */}
            <div className="flex gap-4 justify-end px-4 text-xs opacity-80">
              <div className="flex gap-2">
                <span>Created:</span>
                <span className="font-medium">
                  {formatReadableDate(staff?.created_at)}
                </span>
              </div>
              <div className="flex gap-2">
                <span>Updated:</span>
                <span className="font-medium">
                  {formatReadableDate(staff?.updated_at)}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 px-4 flex justify-start flex-wrap gap-2">
              <SchoolStaffDialog
                isSchool={isSchool}
                auth={auth}
                staff={staff}
              />

              <Button
                library="daisy"
                variant="primary"
                className={cn("w-fit")}
                role="page"
                size="sm"
                href={`/${lang}/p/s-t/${staff?._id}`}
              >
                View Staff
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* ===== MAIN CONTENT ===== */}
        <main className="px-4">
          <div className="flex flex-col gap-2">
            <Label>Staff Details</Label>

            <p className="text-sm opacity-70">
              This staff member is assigned administrative or academic
              responsibilities within the school.
            </p>
          </div>
        </main>

        <SheetFooter className="h-screen">
          <div className="h-screen" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SchoolStaffModifySheet;
