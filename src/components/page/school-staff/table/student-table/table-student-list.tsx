"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import EmptyStudents from "@/components/page/school-staff/students-components/empty-students";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
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
import { StudentTableColumns } from "./student-table-columns";

interface props {
  students: StudentWithRelations[];
  lang: Locale;
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

export default function SchoolStudentTable({
  students,
  lang,
  auth,
  realtimeEnabled = false,
}: props) {
  const displayStudents = useRealtimeList<StudentWithRelations>(
    "student",
    students,
    realtimeEnabled,
  );

  if (displayStudents.length === 0)
    return <EmptyStudents isSchool auth={auth} />;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "updated_at",
      desc: false,
    },
  ]);

  const tableColumns = useMemo(() => StudentTableColumns(lang, auth), [lang]); // Memoize columns

  const table = useReactTable({
    data: displayStudents,
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
        <CardTitle className="">Students</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayStudents}
        />
      </CardContent>
    </Card>
  );
}
