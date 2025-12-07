"use client";

import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import { cn } from "@/lib/utils";
import { getInitialsUsername } from "@/lib/utils/generate-username";
import type { ColumnDef } from "@tanstack/react-table";

export const TeacherSubjectTableColumns = (
  lang: Locale,
): ColumnDef<ClassSubjectWithRelations>[] => {
  return [
    {
      header: "Subject",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <div className=" flex flex-col gap-1 items-start">
          <MyLink
            href={`/a/collections/template_subjects/${row.original.code}`}
            className={cn("flex flex-col gap-1")}
          >
            <LoadingIndicatorText className="font-medium">
              {row.original.name}
            </LoadingIndicatorText>
          </MyLink>
          <MyLink
            href={`/a/collections/template_subjects/${row.original.code}`}
          >
            <LoadingIndicatorText className=" text-sm ">
              {row.original.code}
            </LoadingIndicatorText>
          </MyLink>
        </div>
      ),
    },
    {
      header: "Class",
      accessorKey: "class",
      cell: ({ row }) => {
        return (
          <MyLink
            href={`/${lang}/c/${row.original.class?.username}`}
            className="text-sm"
          >
            {row.original.class?.name ? (
              <LoadingIndicatorText title={row.original.class?.name}>
                {getInitialsUsername(row.original.class?.name)}
              </LoadingIndicatorText>
            ) : (
              "-"
            )}
          </MyLink>
        );
      },
    },
    {
      header: "Category",
      accessorKey: "category",
      meta: { filterVariant: "select" },
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.category}
        </Badge>
      ),
    },
    {
      header: "Credits",
      accessorKey: "credits",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <span className="capitalize text-center">{row.original.credits} %</span>
      ),
    },
  ];
};
