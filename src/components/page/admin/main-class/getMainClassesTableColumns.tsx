"use client";

import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import type { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export const getMainClassesTableColumns = (
  lang: Locale,
): ColumnDef<MainClassModelWithOthers>[] => {
  return [
    {
      header: "Name",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <MyLink
          href={`/${lang}/a/collections/main_classes/${row.original.username}`}
          className={cn(
            "flex flex-row items-center gap-2",
            row.original.disable ? "text-warning tooltip tooltip-warning" : "",
          )}
          data-tip={cn(row.original.disable ? "Disabled Class" : "")}
        >
          <span className="font-medium">{row.original.name}</span>
        </MyLink>
      ),
    },
    {
      header: "Username",
      accessorKey: "username",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <MyLink
          href={`/${lang}/a/collections/main_classes/${row.original.username}`}
          className={cn(
            "flex items-center gap-2",
            row.original.disable ? "text-warning tooltip tooltip-warning" : "",
          )}
          data-tip={cn(row.original.disable ? "Disabled Class" : "")}
        >
          {row.original.username}
        </MyLink>
      ),
    },
    {
      header: "Trade",
      accessorKey: "trade",
      accessorFn: (row) => row.trade?.name ?? "Unassigned",
      meta: { filterVariant: "select" },
      cell: ({ row }) => {
        if (!row.original.trade)
          return (
            <span className="cursor-not-allowed font-medium opacity-50">
              Unassigned
            </span>
          );
        return (
          <MyLink
            href={`/${lang}/a/collections/trades/${row.original.trade?.username}`}
          >
            {row.original.trade?.name}
          </MyLink>
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <p className="line-clamp-2 max-w-3xs">
          {row.original.description ?? "-"}
        </p>
      ),
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      meta: { filterVariant: "dateRange" },
      cell: ({ row }) => (
        <div className="space-y-2">
          <div className="flex flex-row gap-1">
            <span>Created:</span>
            <span>
              {row.original.created_at
                ? new Date(row.original.created_at).toLocaleDateString()
                : "-"}
            </span>
          </div>
          <div className="flex flex-row gap-1">
            <span>Updated:</span>
            <span>
              {row.original.updated_at
                ? new Date(row.original.updated_at).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>
      ),
    },
  ];
};
