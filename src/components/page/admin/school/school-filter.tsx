"use client";

import SearchBox from "@/components/common/form/search-box";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface SchoolsFilterProps {
  auth: AuthContext;
  lang: Locale;
  schools?: Paginated<School>;
}

const SchoolsFilter = ({ auth, lang, schools }: SchoolsFilterProps) => {
  // 🔹 Use the hook to manage loading, search, pagination, and realtime syncing
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<School>({
      auth,
      initialData: schools,
      endpoint: "/schools",
      realtimeKey: "school",
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

          <MyLink
            button={{
              library: "daisy",
              type: "button",
              variant: "primary",
              role: "create",
              size: "sm",
            }}
            href={`/${lang}/a/collections/schools/new`}
          >
            <LoadingIndicatorText>create new school</LoadingIndicatorText>
          </MyLink>
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default SchoolsFilter;
