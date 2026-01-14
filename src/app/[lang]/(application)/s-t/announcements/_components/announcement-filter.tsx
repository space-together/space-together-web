"use client";
import AddAnnouncementDialog from "@/components/common/dialog/add-announcement-dialog";
import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import type { Locale } from "@/i18n";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import type { AnnouncementWithRelations } from "../_schema/announcement";

interface Props {
  auth: AuthContext;
  lang: Locale;
  data?: Paginated<AnnouncementWithRelations>;
}
const AnnouncementFilter = ({ auth, data, lang }: Props) => {
  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<AnnouncementWithRelations>({
      auth,
      endpoint: "/school/announcements/others",
      initialData: {
        data: data?.data ?? [],
        total: data?.total ?? 0,
        total_pages: data?.total_pages ?? 1,
        current_page: data?.current_page ?? 1,
      },
      realtimeKey: "announcement",
    });
  return (
    <PageFilter className=" flex flex-row justify-between w-full">
      <div className="flex gap-4 items-center">
        <ChangeDisplay page="announcements" />
        <SearchBox
          onSearch={handleSearch}
          placeholder="Search announcement..."
          loading={loading}
        />
      </div>
      <div>
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
          <AddAnnouncementDialog
            auth={auth}
            button={{
              role: "create",
              variant: "primary",
              library: "daisy",
              size: "sm",
            }}
            lang={lang}
            name="Add announcement"
          />
        </div>
      </div>
    </PageFilter>
  );
};

export default AnnouncementFilter;
