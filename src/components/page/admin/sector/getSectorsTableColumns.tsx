"use client";

import MyImage from "@/components/common/myImage";
import type { Locale } from "@/i18n";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { cn } from "@/lib/utils";
import { generateEducationIcon } from "@/lib/utils/generate-profile-image";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getSectorsTableColumns = (
  lang: Locale,
): ColumnDef<SectorModel>[] => {
  return [
    {
      header: "Name",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link
          href={`/${lang}/a/collections/sectors/${row.original.username}`}
          className={cn(
            "flex flex-row items-center gap-2",
            row.original.disable ? "text-warning tooltip tooltip-warning" : "",
          )}
          data-tip={cn(row.original.disable ? "Disabled Sector" : "")}
        >
          <MyImage
            src={row.original.logo || generateEducationIcon()}
            alt={`Education logo ${row.original.name}`}
            className="size-12"
          />
          <span className="font-medium">{row.original.name}</span>
        </Link>
      ),
    },
    {
      header: "Username",
      accessorKey: "username",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link
          href={`/${lang}/a/collections/sectors/${row.original.username}`}
          className={cn(
            "flex items-center gap-2",
            row.original.disable ? "text-warning tooltip tooltip-warning" : "",
          )}
          data-tip={cn(row.original.disable ? "Disabled Sector" : "")}
        >
          {row.original.username}
        </Link>
      ),
    },
    {
      header: "Type",
      accessorKey: "type",
      meta: { filterVariant: "select" },
    },
    {
      header: "Country",
      accessorKey: "country",
      meta: { filterVariant: "text" },
    },
    {
      header: "Curriculum",
      accessorKey: "curriculum",
      meta: { filterVariant: "range" },
      cell: ({ row }) => row.original.curriculum?.join(" - ") ?? "N/A",
    },
  ];
};
