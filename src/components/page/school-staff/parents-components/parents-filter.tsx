"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import ParentDialog from "@/components/page/parent/dialogs/parent-dialog";
import { Separator } from "@/components/ui/separator";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  parents?: Paginated<ParentWithRelations>;
}

const ParentFilter = ({ auth, parents }: Props) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<ParentWithRelations>({
      auth,
      initialData: parents,
      endpoint: "/school/parents",
      realtimeKey: "parent",
    });

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search parent..."
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
          <ParentDialog auth={auth} isSchool />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default ParentFilter;
