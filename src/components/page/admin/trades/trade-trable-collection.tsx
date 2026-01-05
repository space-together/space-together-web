"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import CreateTradeDialog from "@/components/page/admin/trades/createTradeDialog";
import { getTradesTableColumns } from "@/components/page/admin/trades/getTradesTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import type { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
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
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface Props {
  auth: AuthContext;
  initialTrades?: TradeModelWithOthers[];
  realtimeEnabled?: boolean;
}

const TradesTableCollection = ({
  auth,
  initialTrades = [],
  realtimeEnabled = false,
}: Props) => {
  const displayTrades = useRealtimeList<TradeModelWithOthers>(
    "trade",
    initialTrades,
    realtimeEnabled,
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: false },
  ]);

  const columns = getTradesTableColumns();

  const table = useReactTable<TradeModelWithOthers>({
    data: displayTrades,
    columns: columns as ColumnDef<TradeModelWithOthers, unknown>[],
    state: { sorting, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-4">
            <span>Trades</span>
          </CardTitle>
          <CardDescription>All registered education trades</CardDescription>
        </div>
        <CreateTradeDialog auth={auth} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Data table */}
        <CommonDataTable table={table} columns={columns} data={displayTrades} />
      </CardContent>
    </Card>
  );
};

export default TradesTableCollection;
