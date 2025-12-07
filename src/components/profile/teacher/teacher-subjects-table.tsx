"use client";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TeacherSubjectTableColumns } from "./teacher-subject-table-columns";

interface TeacherSubjectTableProps {
  subs: ClassSubjectWithRelations[];
  lang: Locale;
  auth: AuthContext;
}

const TeacherSubjectTable = ({ subs, lang }: TeacherSubjectTableProps) => {
  const columns = TeacherSubjectTableColumns(lang);

  const table = useReactTable<ClassSubjectWithRelations>({
    data: subs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });
  return (
    <Card className=" gap-0">
      <CardHeader className="flex items-center justify-between">
        <div className="">
          <CardTitle className="flex items-center gap-4">
            <p>Teacher subjects</p>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 px-2">
        <CommonDataTable
          className=" border-none"
          table={table}
          columns={columns}
          data={subs}
        />
      </CardContent>
    </Card>
  );
};

export default TeacherSubjectTable;
