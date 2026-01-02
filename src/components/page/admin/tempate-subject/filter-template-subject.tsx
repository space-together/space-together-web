"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import DialogTemplateSubject from "./dialog-template-subject";

interface Props {
  auth: AuthContext;
  subjects?: Paginated<TemplateSubjectWithOther>;
}

const FilterTemplateSubject = ({ auth, subjects }: Props) => {
  // 🔹 Use the central hook for search, pagination, and realtime sync
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<TemplateSubjectWithOther>({
      auth,
      initialData: subjects,
      endpoint: "/template-subjects/others",
      realtimeKey: "template_subject",
    });

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search subject..."
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

          <DialogTemplateSubject auth={auth} />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default FilterTemplateSubject;
