"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import { getMainClassesTableColumns } from "@/components/page/admin/main-class/getMainClassesTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface Props {
  auth: AuthContext;
  initialClasses?: MainClassModelWithOthers[];
  realtimeEnabled?: boolean;
  lang: Locale;
}

const MainClassesTableCollection = ({
  auth,
  initialClasses = [],
  lang,
  realtimeEnabled = false,
}: Props) => {
  const displayClasses = useRealtimeList<MainClassModelWithOthers>(
    "main_class",
    initialClasses,
    realtimeEnabled,
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = useMemo(() => getMainClassesTableColumns(lang), [lang]);

  const table = useReactTable<MainClassModelWithOthers>({
    data: displayClasses,
    columns: columns as ColumnDef<MainClassModelWithOthers, unknown>[],
    state: { sorting, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-4">
            <span>Main Classes</span>
          </CardTitle>
          <CardDescription>All registered main classes</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Data table */}
        <CommonDataTable
          table={table}
          columns={columns}
          data={displayClasses}
        />
      </CardContent>
    </Card>
  );
};

export default MainClassesTableCollection;
