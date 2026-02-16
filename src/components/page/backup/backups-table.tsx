"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { BackupStatus, SchoolBackup } from "@/lib/schema/backup-schema";
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
import { Plus, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import RestoreDialog from "./restore-dialog";


interface Props {
  backups: SchoolBackup[];
  lang: Locale;
  auth: AuthContext;
  total: number;
  readOnly?: boolean;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
};

const getStatusBadge = (status: BackupStatus) => {
  const variants: Record<BackupStatus, "default" | "secondary" | "destructive"> = {
    COMPLETED: "default",
    IN_PROGRESS: "secondary",
    FAILED: "destructive",
  };

  return (
    <Badge variant={variants[status]} className="capitalize">
      {status.replace("_", " ")}
    </Badge>
  );
};

export default function BackupsTable({
  backups,
  lang,
  auth,
  total,
  readOnly = false,
}: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "created_at", desc: true },
  ]);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const router = useRouter();

  const handleCreateBackup = () => {
    startTransition(async () => {
      const res = await apiRequest<void, SchoolBackup>(
        "post",
        "/backups/manual",
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );

      if (res.data) {
        showToast({
          title: "Backup started",
          description: "Manual backup is in progress",
          type: "success",
        });
        router.refresh();
      } else {
        showToast({
          title: "Failed to create backup",
          description: res.message,
          type: "error",
        });
      }
    });
  };

  const columns: ColumnDef<SchoolBackup>[] = useMemo(
    () => [
      {
        accessorKey: "backup_name",
        header: "Backup Name",
        cell: ({ row }) => (
          <div className="max-w-xs truncate font-medium">
            {row.original.backup_name}
          </div>
        ),
      },
      {
        accessorKey: "backup_type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="outline" className="capitalize">
            {row.original.backup_type.toLowerCase()}
          </Badge>
        ),
      },
      {
        accessorKey: "size_bytes",
        header: "Size",
        cell: ({ row }) => formatBytes(row.original.size_bytes),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) =>
          format(new Date(row.original.created_at), "MMM dd, yyyy HH:mm"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const backup = row.original;
          const canRestore =
            backup.status === "COMPLETED" && !readOnly && auth.user.role === "ADMIN";

          return (
            <div className="flex gap-2">
              {canRestore && (
                <RestoreDialog
                  backup={backup}
                  auth={auth}
                  onSuccess={() => router.refresh()}
                />
              )}
              {backup.status === "IN_PROGRESS" && (
                <RefreshCw className="size-4 animate-spin text-muted-foreground" />
              )}
            </div>
          );
        },
      },
    ],
    [auth, readOnly, router],
  );

  const table = useReactTable({
    data: backups,
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
        <CardTitle>Backups</CardTitle>
        {!readOnly && auth.user.role === "ADMIN" && (
          <Button
            onClick={handleCreateBackup}
            disabled={isPending}
            size="sm"
            library="daisy"
          >
            <Plus className="size-4" />
            Manual Backup
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0">
        {backups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No backups found</p>
            {!readOnly && auth.user.role === "ADMIN" && (
              <Button
                onClick={handleCreateBackup}
                disabled={isPending}
                size="sm"
                library="daisy"
                variant="default"
                className="mt-4"
              >
                <Plus className="size-4" />
                Create First Backup
              </Button>
            )}
          </div>
        ) : (
          <CommonDataTable
            table={table}
            columns={columns}
            data={backups}
            loading={isPending}
          />
        )}
      </CardContent>
    </Card>
  );
}
