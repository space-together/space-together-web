"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import StudentDialog from "@/components/page/student/dialogs/student-dialog";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  auth: AuthContext;
  students?: Paginated<StudentWithRelations>;
}

const StudentFilter = ({ auth, students }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // 🔹 track if we are still showing default data
  const isDefault = useRef(true);

  const [pagination, setPagination] = useState({
    total_pages: students?.total_pages || 0,
    current_page: students?.current_page || 1,
  });

  const { data, addItem, deleteItem } =
    useRealtimeData<StudentWithRelations>("student");

  // 🔹 Load default students ONLY once
  useEffect(() => {
    students?.data.forEach(addItem);
  }, []);

  const fetchStudents = useCallback(
    async (page: number, filterValue: string) => {
      setLoading(true);
      try {
        const skip = (page - 1) * LIMIT;

        const params = new URLSearchParams({
          limit: LIMIT.toString(),
          skip: skip.toString(),
        });

        if (filterValue) params.set("filter", filterValue);

        const res = await apiRequest<void, Paginated<StudentWithRelations>>(
          "get",
          `/school/students/others?${params.toString()}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
            realtime: "student",
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
        console.error(e);
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
      // 🔄 Reset to default students (NO FETCH)
      data.forEach((s) => deleteItem(s.id || s._id || ""));
      students?.data.forEach(addItem);

      setPagination({
        total_pages: students?.total_pages || 0,
        current_page: students?.current_page || 1,
      });

      isDefault.current = true;
      return;
    }

    fetchStudents(1, value);
  };

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
            onPageChange={(page) => fetchStudents(page, filter)}
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
