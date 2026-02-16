"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { DeletedEntity } from "@/lib/schema/backup-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
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
import { format } from "date-fns";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

interface Props {
  deletedEntities: DeletedEntity[];
  lang: Locale;
  auth: AuthContext;
  total: number;
}

const entityTypeLabels: Record<string, string> = {
  students: "Student",
  teachers: "Teacher",
  school_staff: "Staff",
  parents: "Parent",
  classes: "Class",
  announcements: "Announcement",
  assignments: "Assignment",
  exams: "Exam",
};

export default function RecycleBinTable({
  deletedEntities,
  lang,
  auth,
  total,
}: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "deleted_at", desc: true },
  ]);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const router = useRouter();

  const handleRestore = (entity: DeletedEntity) => {
    startTransition(async () => {
      const res = await apiRequest<
        { entity_type: string; entity_id: string },
        { message: string }
      >(
        "post",
        "/recycle-bin/restore",
        {
          entity_type: entity.entity_type,
          entity_id: entity.entity_id,
        },
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );

      if (res.data) {
        showToast({
          title: "Entity restored",
          description: `${entityTypeLabels[entity.entity_type] || entity.entity_type} has been restored successfully`,
          type: "success",
        });
        router.refresh();
      } else {
        showToast({
          title: "Failed to restore entity",
          description: res.message,
          type: "error",
        });
      }
    });
  };

  const columns: ColumnDef<DeletedEntity>[] = useMemo(
    () => [
      {
        accessorKey: "entity_type",
        header: "Entity Type",
        cell: ({ row }) => (
          <Badge variant="outline" className="capitalize">
            {entityTypeLabels[row.original.entity_type] ||
              row.original.entity_type}
          </Badge>
        ),
      },
      {
        accessorKey: "entity_name",
        header: "Name",
        cell: ({ row }) => (
          <div className="max-w-xs truncate font-medium">
            {row.original.entity_name || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "entity_id",
        header: "Entity ID",
        cell: ({ row }) => (
          <code className="text-xs text-muted-foreground">
            {row.original.entity_id.slice(0, 8)}...
          </code>
        ),
      },
      {
        accessorKey: "deleted_by_name",
        header: "Deleted By",
        cell: ({ row }) => (
          <div className="text-sm">
            {row.original.deleted_by_name || "Unknown"}
          </div>
        ),
      },
      {
        accessorKey: "deleted_at",
        header: "Deleted At",
        cell: ({ row }) =>
          format(new Date(row.original.deleted_at), "MMM dd, yyyy HH:mm"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const entity = row.original;

          return (
            <Button
              size="sm"
              variant="default"
              library="daisy"
              onClick={() => handleRestore(entity)}
              disabled={isPending}
            >
              <RotateCcw className="size-4" />
              Restore
            </Button>
          );
        },
      },
    ],
    [isPending],
  );

  const table = useReactTable({
    data: deletedEntities,
    columns,
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
      <CardHeader className="flex w-full flex-row items-center justify-between border-b">
        <CardTitle>Deleted Entities</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {deletedEntities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No deleted entities found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Deleted items will appear here and can be restored
            </p>
          </div>
        ) : (
          <CommonDataTable
            table={table}
            columns={columns}
            data={deletedEntities}
            loading={isPending}
          />
        )}
      </CardContent>
    </Card>
  );
}
