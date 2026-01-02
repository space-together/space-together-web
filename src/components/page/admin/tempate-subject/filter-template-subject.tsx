"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useRef, useState } from "react";
import DialogTemplateSubject from "./dialog-template-subject";

interface Props {
  auth: AuthContext;
  subjects?: Paginated<TemplateSubjectWithOther>;
}

const FilterTemplateSubject = ({ auth, subjects }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // 🔹 track default state
  const isDefault = useRef(true);

  const [pagination, setPagination] = useState({
    total_pages: subjects?.total_pages || 0,
    current_page: subjects?.current_page || 1,
  });

  const { data, addItem, deleteItem } =
    useRealtimeData<TemplateSubjectWithOther>("template_subject");

  // 🔹 Load default subjects ONCE
  useEffect(() => {
    subjects?.data.forEach(addItem);
  }, []);

  const fetchSubjects = useCallback(
    async (page: number, filterValue: string) => {
      setLoading(true);
      try {
        const skip = (page - 1) * LIMIT;

        const params = new URLSearchParams({
          limit: LIMIT.toString(),
          skip: skip.toString(),
        });

        if (filterValue) {
          params.set("filter", filterValue);
        }

        const res = await apiRequest<void, Paginated<TemplateSubjectWithOther>>(
          "get",
          `/template-subjects/others?${params.toString()}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
            realtime: "template_subject",
          },
        );

        if (res?.data) {
          // 🔥 Replace data only on user action
          data.forEach((s) => deleteItem(s._id || s.id || ""));
          res.data.data.forEach(addItem);

          setPagination({
            total_pages: res.data.total_pages,
            current_page: res.data.current_page,
          });

          isDefault.current = false;
        }
      } catch (err) {
        console.error("Failed to fetch template subjects:", err);
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
      // 🔄 Reset to default (NO FETCH)
      data.forEach((s) => deleteItem(s._id || s.id || ""));
      subjects?.data.forEach(addItem);

      setPagination({
        total_pages: subjects?.total_pages || 0,
        current_page: subjects?.current_page || 1,
      });

      isDefault.current = true;
      return;
    }

    fetchSubjects(1, value);
  };

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
            onPageChange={(page) => fetchSubjects(page, filter)}
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
