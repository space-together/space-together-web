"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import TeacherDialog from "@/components/page/teacher/dialog/teacher-dialog";
import { Separator } from "@/components/ui/separator";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  teachers?: Paginated<TeacherWithRelations>;
}

const SchoolStaffTeacherFilter = ({ auth, teachers }: Props) => {
  // 🔹 Hook handles: initial data loading, search reset, and pagination
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<TeacherWithRelations>({
      auth,
      initialData: teachers,
      endpoint: "/school/teachers/others",
      realtimeKey: "teacher",
    });

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search teacher..."
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

          <TeacherDialog auth={auth} isSchool />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default SchoolStaffTeacherFilter;
