"use client";

import { UserSmCard } from "@/components/cards/user-card";
import MyLink from "@/components/common/myLink";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import { cn } from "@/lib/utils";
import { getInitialsUsername } from "@/lib/utils/generate-username";
import type { ColumnDef } from "@tanstack/react-table";

export const ClassSubjectTableColumns = (
  lang: Locale,
): ColumnDef<ClassSubjectWithRelations>[] => {
  return [
    {
      header: "Subject",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <MyLink
          href={`/a/collections/template_subjects/${row.original.code}`}
          className={cn("flex flex-col gap-1")}
        >
          <span className="font-medium">{row.original.name}</span>
        </MyLink>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <MyLink href={`/a/collections/template_subjects/${row.original.code}`}>
          <span className="">{row.original.code}</span>
        </MyLink>
      ),
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
              <span title={row.original.class?.name}>
                {getInitialsUsername(row.original.class?.name)}
              </span>
            ) : (
              "-"
            )}
          </MyLink>
        );
      },
    },

    {
      header: "Teacher",
      accessorKey: "teacher",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 text-sm">
            {row.original.teacher ? (
              <UserSmCard
                lang={lang}
                name={row.original.teacher?.name}
                image={row.original.teacher?.image}
              />
            ) : (
              "None"
            )}
          </div>
        );
      },
    },
  ];
};
