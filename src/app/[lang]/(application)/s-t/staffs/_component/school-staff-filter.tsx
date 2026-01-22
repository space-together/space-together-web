"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import SchoolStaffDialog from "./school-staff-dialog";

interface Props {
  auth: AuthContext;
  staffs?: Paginated<SchoolStaff>;
}

const SchoolStaffFilter = ({ auth, staffs }: Props) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<SchoolStaff>({
      auth,
      initialData: staffs,
      endpoint: "/school/school-staff",
      realtimeKey: "school_staff",
    });

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay page="school-staff" />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search staff..."
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
          <SchoolStaffDialog auth={auth} />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default SchoolStaffFilter;
