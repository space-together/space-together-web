"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import CreateNewUserDialog from "@/components/page/admin/users/createNewUserDialog";
import { Separator } from "@/components/ui/separator";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { PaginatedUsers } from "@/lib/schema/relations-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  users?: PaginatedUsers;
}

const UsersFilter = ({ auth, users }: Props) => {
  const { loading, filter, pagination, handleSearch, handlePageChange } =
    useFilterData<UserModel>({
      auth,
      initialData: users,
      endpoint: "/users",
      realtimeKey: "user",
    });

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
            onPageChange={handlePageChange}
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
