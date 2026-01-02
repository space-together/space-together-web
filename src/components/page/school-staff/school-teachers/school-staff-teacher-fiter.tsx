"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import TeacherDialog from "@/components/page/teacher/dialog/teacher-dialog";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  auth: AuthContext;
  teachers?: Paginated<TeacherWithRelations>;
}

const SchoolStaffTeacherFilter = ({ auth, teachers }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // 🔹 track default state
  const isDefault = useRef(true);

  const [pagination, setPagination] = useState({
    total_pages: teachers?.total_pages || 0,
    current_page: teachers?.current_page || 1,
  });

  const { data, addItem, deleteItem } =
    useRealtimeData<TeacherWithRelations>("teacher");

  // 🔹 Load default teachers ONLY once
  useEffect(() => {
    teachers?.data.forEach(addItem);
  }, []);

  const fetchTeachers = useCallback(
    async (page: number, filterValue: string) => {
      setLoading(true);
      try {
        const skip = (page - 1) * LIMIT;

        const params = new URLSearchParams({
          limit: LIMIT.toString(),
          skip: skip.toString(),
        });

        if (filterValue) params.set("filter", filterValue);

        const res = await apiRequest<void, Paginated<TeacherWithRelations>>(
          "get",
          `/school/teachers/others?${params.toString()}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
            realtime: "teacher",
          },
        );

        if (res?.data) {
          // 🔥 Replace realtime data
          data.forEach((t) => deleteItem(t.id || t._id || ""));
          res.data.data.forEach(addItem);

          setPagination({
            total_pages: res.data.total_pages,
            current_page: res.data.current_page,
          });

          isDefault.current = false;
        }
      } catch (e) {
        console.error("Failed to fetch teachers:", e);
      } finally {
        setLoading(false);
      }
    },
    [auth, data],
  );

  // 🔁 Search handler
  const handleSearch = (value: string) => {
    setFilter(value);

    if (!value) {
      // 🔄 Reset to default teachers (NO FETCH)
      data.forEach((t) => deleteItem(t.id || t._id || ""));
      teachers?.data.forEach(addItem);

      setPagination({
        total_pages: teachers?.total_pages || 0,
        current_page: teachers?.current_page || 1,
      });

      isDefault.current = true;
      return;
    }

    fetchTeachers(1, value);
  };

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
            onPageChange={(page) => fetchTeachers(page, filter)}
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
