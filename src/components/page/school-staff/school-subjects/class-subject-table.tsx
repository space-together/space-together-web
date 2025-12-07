"use client";

import RealtimeEnabled from "@/components/common/realtime-enabled";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClassSubjectTableColumns } from "./class-subject-table-columns";

interface Props {
  auth: AuthContext;
  realtimeEnabled?: boolean;
  currentSubjects: ClassSubjectWithRelations[];
  serverMode?: boolean;
  lang: Locale;
}

const ClassSubjectTable = ({
  auth,
  realtimeEnabled = false,
  currentSubjects,
  serverMode = false,
  lang,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ initialize realtime data ONLY if not serverMode
  const { data: realtimeSubjects, isConnected } =
    useRealtimeData<ClassSubjectWithRelations>(
      "class_subject",
      !serverMode, // disable subscription when serverMode true
    );

  const initialPage = parseInt(searchParams.get("page") ?? "1", 10) - 1;
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [pageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] =
    useState<ClassSubjectWithRelations[]>(currentSubjects);

  // ✅ client mode → realtime updates
  useEffect(() => {
    if (!serverMode && realtimeSubjects?.length) {
      setData(realtimeSubjects);
    }
  }, [realtimeSubjects, serverMode]);

  const columns = ClassSubjectTableColumns(lang);

  const table = useReactTable<ClassSubjectWithRelations>({
    data,
    columns,
    state: { sorting, columnFilters, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: (updater) => {
      const nextPage =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize }).pageIndex
          : updater.pageIndex;

      if (nextPage !== pageIndex) {
        setPageIndex(nextPage);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", (nextPage + 1).toString());
        router.replace(`?${params.toString()}`, { scroll: false });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: serverMode, // ✅ ensures react-table won't paginate locally
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-4">
            <span>Class Subjects</span>
            {realtimeEnabled && !serverMode && (
              <RealtimeEnabled isConnected={isConnected} />
            )}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {["name", "code", "category"].map((col) => (
            <div key={col} className="w-36">
              <TableFilter column={table.getColumn(col)!} />
            </div>
          ))}
        </div>

        {/* Data Table */}
        <CommonDataTable
          table={table}
          columns={columns}
          data={data}
          serverMode={serverMode}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
        />
      </CardContent>
    </Card>
  );
};

export default ClassSubjectTable;
