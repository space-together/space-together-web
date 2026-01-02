"use client";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import { getUsersTableCollectionColumns } from "@/components/page/admin/users/users_table_collection_columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

interface Props {
  users: UserModel[];
  auth: AuthContext;
  realtimeEnabled?: boolean;
  lang: Locale;
}

const UsersTableCollection = ({
  users: initialUsers,
  auth,
  realtimeEnabled,
  lang,
}: Props) => {
  const { data: currentUsers, isConnected } =
    useRealtimeData<UserModel>("user");
  const [displayUsers, setDisplayUsers] = useState<UserModel[]>(initialUsers);

  useEffect(() => {
    if (currentUsers && currentUsers.length > 0) {
      setDisplayUsers(currentUsers);
    }
  }, [currentUsers]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const tableColumns = useMemo(
    () => getUsersTableCollectionColumns(lang),
    [lang],
  );

  const table = useReactTable({
    data: displayUsers,
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
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Users</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ✅ pass table + data */}
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayUsers}
        />
      </CardContent>
    </Card>
  );
};

export default UsersTableCollection;
