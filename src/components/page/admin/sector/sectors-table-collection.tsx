"use client";

import RealtimeEnabled from "@/components/common/realtime-enabled";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import { getSectorsTableColumns } from "@/components/page/admin/sector/getSectorsTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
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
  realtimeEnabled?: boolean;
  lang: Locale;
}

const SectorsTableCollection = ({
  auth,
  lang,
  realtimeEnabled = false,
}: Props) => {
  const { data: sectors, isConnected } = useRealtimeData<SectorModel>("sector");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = useMemo(() => getSectorsTableColumns(lang), [lang]);

  const table = useReactTable<SectorModel>({
    data: sectors,
    columns: columns as ColumnDef<SectorModel, unknown>[],
    state: { sorting, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-4">
            <span>Sectors</span>
            {realtimeEnabled && <RealtimeEnabled isConnected={isConnected} />}
          </CardTitle>
          <CardDescription>All registered education sectors</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Data table */}
        <CommonDataTable table={table} columns={columns} data={sectors} />
      </CardContent>
    </Card>
  );
};

export default SectorsTableCollection;
