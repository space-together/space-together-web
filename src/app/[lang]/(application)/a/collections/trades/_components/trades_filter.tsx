"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import CreateTradeDialog from "@/components/page/admin/trades/createTradeDialog";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface TradesFilterProps {
  auth: AuthContext;
  lang: Locale;
  trades?: Paginated<TradeModelWithOthers>;
}

const TradesFilter = ({ auth, trades }: TradesFilterProps) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<TradeModelWithOthers>({
      auth,
      initialData: trades,
      endpoint: "/trades/others",
      realtimeKey: "trade",
    });

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search school..."
            loading={loading}
          />
        </div>

        <div className="flex gap-4 items-center">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={handlePageChange}
            loading={loading}
            maxVisible={7}
            showNextPrev
            variant="outline"
            size="sm"
          />
          <CreateTradeDialog auth={auth} />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default TradesFilter;
