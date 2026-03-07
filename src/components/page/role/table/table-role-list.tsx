"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import EmptyRoles from "@/components/page/role/components/empty-roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { Role } from "@/lib/schema/role/role-schema";
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
import { RoleTableColumns } from "./role-table-columns";

interface Props {
  roles: Role[];
  lang: string;
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

export default function RoleTable({
  roles,
  lang,
  auth,
  realtimeEnabled = false,
}: Props) {
  const displayRoles = useRealtimeList<Role>("role", roles, realtimeEnabled);

  if (displayRoles.length === 0) return <EmptyRoles auth={auth} />;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const tableColumns = useMemo(() => RoleTableColumns(auth, lang), [auth, lang]);

  const table = useReactTable({
    data: displayRoles,
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
        <CardTitle>Roles</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayRoles}
        />
      </CardContent>
    </Card>
  );
}
