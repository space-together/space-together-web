"use client";

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
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
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
  sectors: SectorModel[];
}

const SectorsTableCollection = ({
  auth,
  sectors,
  lang,
  realtimeEnabled = false,
}: Props) => {
  const displaySectors = useRealtimeList<SectorModel>(
    "sector",
    sectors,
    realtimeEnabled,
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = useMemo(() => getSectorsTableColumns(lang), [lang]);

  const table = useReactTable<SectorModel>({
    data: displaySectors,
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
          </CardTitle>
          <CardDescription>All registered education sectors</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Data table */}
        <CommonDataTable
          table={table}
          columns={columns}
          data={displaySectors}
        />
      </CardContent>
    </Card>
  );
};

export default SectorsTableCollection;
