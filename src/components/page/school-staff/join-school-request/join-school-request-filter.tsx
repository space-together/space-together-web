"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  requests?: Paginated<JoinSchoolRequestWithRelations>;
  classes: Class[];
  lang: Locale;
}

const JoinSchoolRequestFilter = ({
  auth,
  requests,
  classes,
  lang,
}: Props) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<JoinSchoolRequestWithRelations>({
      auth,
      initialData: requests,
      endpoint: `/join-school-requests/others?field=school_id&value=${auth.school?.id}`,
      realtimeKey: "join_school_request",
    });

  return (
    <PageFilter>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search requests..."
            loading={loading}
          />
        </div>

        <div className="flex items-center gap-4">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={handlePageChange}
            loading={loading}
            maxVisible={7}
            showNextPrev
            variant="outline"
          />
          {/*<SendJoinSchoolRequest classes={classes} lang={lang} auth={auth} />*/}
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default JoinSchoolRequestFilter;
