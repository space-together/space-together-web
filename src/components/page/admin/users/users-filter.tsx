"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import CreateNewUserDialog from "@/components/page/admin/users/createNewUserDialog";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { PaginatedUsers } from "@/lib/schema/relations-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  auth: AuthContext;
  users?: PaginatedUsers;
}

const UsersFilter = ({ auth, users }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // 🔹 track if default data is shown
  const isDefault = useRef(true);

  const [pagination, setPagination] = useState({
    total_pages: users?.total_pages || 0,
    current_page: users?.current_page || 1,
  });

  const { data, addItem, deleteItem } = useRealtimeData<UserModel>("user");

  // 🔹 Load default users ONCE
  useEffect(() => {
    users?.users.forEach(addItem);
  }, []);

  const fetchUsers = useCallback(
    async (page: number, filterValue: string) => {
      setLoading(true);
      try {
        const skip = (page - 1) * LIMIT;

        const params = new URLSearchParams({
          limit: LIMIT.toString(),
          skip: skip.toString(),
        });

        if (filterValue) params.set("filter", filterValue);

        const res = await apiRequest<void, PaginatedUsers>(
          "get",
          `/users?${params.toString()}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
            realtime: "user",
          },
        );

        if (res?.data) {
          // 🔥 Replace data only on user action
          data.forEach((u) => deleteItem(u._id || u.id || ""));
          res.data.users.forEach(addItem);

          setPagination({
            total_pages: res.data.total_pages,
            current_page: res.data.current_page,
          });

          isDefault.current = false;
        }
      } catch (e) {
        console.error("Failed to fetch users:", e);
      } finally {
        setLoading(false);
      }
    },
    [auth, data],
  );

  // 🔍 Search handler (same logic as StudentFilter)
  const handleSearch = (value: string) => {
    setFilter(value);

    if (!value) {
      // 🔄 Reset to default users (NO FETCH)
      data.forEach((u) => deleteItem(u._id || u.id || ""));
      users?.users.forEach(addItem);

      setPagination({
        total_pages: users?.total_pages || 0,
        current_page: users?.current_page || 1,
      });

      isDefault.current = true;
      return;
    }

    fetchUsers(1, value);
  };

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search user..."
            loading={loading}
          />
        </div>

        <div className="flex gap-4 items-center">
          <SmartPagination
            totalPages={pagination.total_pages}
            currentPage={pagination.current_page}
            onPageChange={(page) => fetchUsers(page, filter)}
            loading={loading}
            maxVisible={7}
            showNextPrev
            variant="outline"
            size="sm"
          />

          <CreateNewUserDialog auth={auth} />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default UsersFilter;
