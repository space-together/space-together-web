"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import MainClassDialog from "./main-class-dialog";

interface MainClassesFilterProps {
  auth: AuthContext;
  lang: Locale;
  cls?: Paginated<MainClassModelWithOthers>;
}

const MainClassesFilter = ({ auth, cls }: MainClassesFilterProps) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<MainClassModelWithOthers>({
      auth,
      initialData: cls,
      endpoint: `/main-classes/others`,
      realtimeKey: "main_class",
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
          <MainClassDialog auth={auth} />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default MainClassesFilter;
