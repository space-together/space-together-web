"use client";
import SearchBox from "@/components/common/form/search-box";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface SchoolsFilterProps {
  auth: AuthContext;
  lang: Locale;
}

const SchoolsFilter = ({ auth, lang }: SchoolsFilterProps) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });

  const { data, addItem, deleteItem } = useRealtimeData<School>("school");

  async function fetchSchools(page = 1, filterValue = filter) {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;

      const params = new URLSearchParams({
        limit: LIMIT.toString(),
        skip: skip.toString(),
      });

      if (filterValue) params.set("filter", filterValue);

      const res = await apiRequest<void, Paginated<School>>(
        "get",
        `/schools?${params.toString()}`,
        undefined,
        {
          token: auth.token,
          realtime: "school",
        },
      );

      if (res?.data) {
        // Clear old data
        data.forEach((s) => deleteItem(s.id || s._id || ""));
        // Add new schools
        res.data.data.forEach((s) => addItem(s));

        setPagination({
          total_pages: res.data.total_pages,
          current_page: res.data.current_page,
        });
      }
    } catch (err) {
      console.error("Failed to fetch schools:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSchools(1);
  }, [filter]);

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={(value) => setFilter(value)}
            placeholder="Search student..."
            loading={loading}
          />
        </div>

        <div className="flex gap-4 items-center">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={(page) => fetchSchools(page)}
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
