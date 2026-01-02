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
import { useCallback, useEffect, useRef, useState } from "react";

interface SchoolsFilterProps {
  auth: AuthContext;
  lang: Locale;
  schools?: Paginated<School>; // 👈 default schools
}

const SchoolsFilter = ({ auth, lang, schools }: SchoolsFilterProps) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // 🔹 track if default data is shown
  const isDefault = useRef(true);

  const [pagination, setPagination] = useState({
    total_pages: schools?.total_pages || 0,
    current_page: schools?.current_page || 1,
  });

  const { data, addItem, deleteItem } = useRealtimeData<School>("school");

  // 🔹 Load default schools ONCE
  useEffect(() => {
    schools?.data.forEach(addItem);
  }, []);

  const fetchSchools = useCallback(
    async (page: number, filterValue: string) => {
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
          // 🔥 Replace data only on user action
          data.forEach((s) => deleteItem(s.id || s._id || ""));
          res.data.data.forEach(addItem);

          setPagination({
            total_pages: res.data.total_pages,
            current_page: res.data.current_page,
          });

          isDefault.current = false;
        }
      } catch (e) {
        console.error("Failed to fetch schools:", e);
      } finally {
        setLoading(false);
      }
    },
    [auth, data],
  );

  // 🔍 Search handler
  const handleSearch = (value: string) => {
    setFilter(value);

    if (!value) {
      // 🔄 Reset to default schools (NO FETCH)
      data.forEach((s) => deleteItem(s.id || s._id || ""));
      schools?.data.forEach(addItem);

      setPagination({
        total_pages: schools?.total_pages || 0,
        current_page: schools?.current_page || 1,
      });

      isDefault.current = true;
      return;
    }

    fetchSchools(1, value);
  };

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
            onPageChange={(page) => fetchSchools(page, filter)}
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
