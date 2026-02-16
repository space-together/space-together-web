"use client";

import { AuditDetailDialog } from "@/components/audit/audit-detail-dialog";
import {
    AuditFilter,
    type AuditFilters,
} from "@/components/audit/audit-filter";
import {
    type AuditLog,
    createAuditTableColumns,
} from "@/components/audit/audit-table-columns";
import NoItemsPage from "@/components/common/pages/no-items-page";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import AppPageHeader from "@/components/page/common/app-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import {
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

interface AuditLogListResponse {
  data: AuditLog[];
  total: number;
  total_pages: number;
  current_page: number;
}

interface Props {
  auth: AuthContext;
  lang: Locale;
}

export default function AuditLogsClient({ auth, lang }: Props) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<AuditFilters>({});
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "created_at", desc: true },
  ]);

  const pageSize = 20;

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: String(pageSize),
        skip: String(page * pageSize),
        ...(filters.severity && { severity: filters.severity }),
        ...(filters.entity_type && { entity_type: filters.entity_type }),
        ...(filters.action && { action: filters.action }),
        ...(filters.from_date && { from_date: filters.from_date }),
        ...(filters.to_date && { to_date: filters.to_date }),
        ...(filters.filter && { filter: filters.filter }),
      });

      const response = await apiRequest<void, AuditLogListResponse>(
        "get",
        `/audit-logs/others?${params}`,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );

      if (response?.data) {
        setLogs(response.data.data);
        setTotal(response.data.total);
      }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  }, [auth.token, auth.schoolToken, page, filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleViewDetails = useCallback((log: AuditLog) => {
    setSelectedLog(log);
    setDialogOpen(true);
  }, []);

  const handleFilterChange = useCallback((newFilters: AuditFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset to first page on filter change
  }, []);

  const columns = useMemo(
    () => createAuditTableColumns(handleViewDetails),
    [handleViewDetails],
  );

  const table = useReactTable({
    data: logs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / pageSize),
  });

  return (
    <div className="space-y-4">
      <AppPageHeader
        total={total}
        title="Audit Logs"
        description="View system activity and change history"
      />

      <AuditFilter
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {loading ? (
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      ) : logs.length === 0 ? (
        <NoItemsPage title="No audit logs found" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Audit History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CommonDataTable
              table={table}
              columns={columns}
              data={logs}
              serverMode
              pageIndex={page}
              setPageIndex={setPage}
              noFooter={false}
              pageSize={pageSize}
            />
          </CardContent>
        </Card>
      )}

      <AuditDetailDialog
        log={selectedLog}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
