"use client";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
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
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import type { AnnouncementWithRelations } from "../_schema/announcement";
import { AnnouncementTableColumn } from "./announcement-table-column";

interface Props {
  lang: Locale;
  auth: AuthContext;
  data: AnnouncementWithRelations[];
}
const AnnouncementTable = ({ lang, data, auth }: Props) => {
  const displayAnnouncement = useRealtimeList<AnnouncementWithRelations>(
    "announcement",
    data,
    true,
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = AnnouncementTableColumn(lang, auth);

  const table = useReactTable<AnnouncementWithRelations>({
    data: displayAnnouncement,
    columns: columns as ColumnDef<AnnouncementWithRelations, unknown>[],
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <Card className=" p-0 gap-0">
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <CommonDataTable
          table={table}
          columns={columns}
          data={displayAnnouncement}
        />
      </CardContent>
    </Card>
  );
};

export default AnnouncementTable;
