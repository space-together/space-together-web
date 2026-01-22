"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import EmptyStudents from "@/components/page/school-staff/students-components/empty-students";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
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
import { SchoolStaffTableColumns } from "./school-staff-table-columns";

interface props {
  schoolStaffs: SchoolStaff[];
  lang: Locale;
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

export default function SchoolStaffTable({
  schoolStaffs,
  lang,
  auth,
  realtimeEnabled = false,
}: props) {
  const displaySchoolStaffs = useRealtimeList<SchoolStaff>(
    "school_staff",
    schoolStaffs,
    realtimeEnabled,
  );

  if (displaySchoolStaffs.length === 0)
    return <EmptyStudents isSchool auth={auth} />;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "updated_at",
      desc: false,
    },
  ]);

  const tableColumns = useMemo(
    () => SchoolStaffTableColumns(lang, auth),
    [lang],
  ); // Memoize columns

  const table = useReactTable({
    data: displaySchoolStaffs,
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
        <CardTitle className="">School Staff</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displaySchoolStaffs}
        />
      </CardContent>
    </Card>
  );
}
