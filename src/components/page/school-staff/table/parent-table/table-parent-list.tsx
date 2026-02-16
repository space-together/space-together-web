"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import EmptyParents from "@/components/page/school-staff/parents-components/empty-parents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
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
import { ParentTableColumns } from "./parent-table-columns";

interface props {
  parents: ParentWithRelations[];
  lang: Locale;
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

export default function SchoolParentTable({
  parents,
  lang,
  auth,
  realtimeEnabled = false,
}: props) {
  const displayParents = useRealtimeList<ParentWithRelations>(
    "parent",
    parents,
    realtimeEnabled,
  );

  if (displayParents.length === 0)
    return <EmptyParents isSchool auth={auth} />;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "updated_at",
      desc: false,
    },
  ]);

  const tableColumns = useMemo(() => ParentTableColumns(lang, auth), [lang]);

  const table = useReactTable({
    data: displayParents,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  return (
    <Card>
      <CardHeader className="flex w-full justify-between border-b-0">
        <CardTitle className="">Parents</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayParents}
        />
      </CardContent>
    </Card>
  );
}
