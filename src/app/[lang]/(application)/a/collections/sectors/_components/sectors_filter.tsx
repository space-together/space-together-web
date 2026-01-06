"use client";

import SectorDialog from "@/app/[lang]/(application)/a/collections/sectors/_components/sector-dailog";
import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface SectorsFilterProps {
  auth: AuthContext;
  lang: Locale;
  sectors?: Paginated<SectorModel>;
}

const SectorsFilter = ({ auth, sectors }: SectorsFilterProps) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<SectorModel>({
      auth,
      initialData: sectors,
      endpoint: "/sectors",
      realtimeKey: "sector",
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
          <SectorDialog auth={auth} />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default SectorsFilter;
