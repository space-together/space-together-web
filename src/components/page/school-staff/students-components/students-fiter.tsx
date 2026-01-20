"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import StudentDialog from "@/components/page/student/dialogs/student-dialog";
import { Separator } from "@/components/ui/separator";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  students?: Paginated<StudentWithRelations>;
}

const StudentFilter = ({ auth, students }: Props) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<StudentWithRelations>({
      auth,
      initialData: students,
      endpoint: "/school/students/others",
      realtimeKey: "student",
    });

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search student..."
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
          <StudentDialog auth={auth} isSchool />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default StudentFilter;
