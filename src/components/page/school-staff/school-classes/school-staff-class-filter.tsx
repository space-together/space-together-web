"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import SmartPagination from "@/components/common/smart-pagination";
import ChangeDisplay from "@/components/display/change-diplay";
import ClassDialog from "@/components/page/school-staff/dialog/class-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useFilterData } from "@/lib/hooks/use-filter-data";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useState } from "react";

interface Props {
  auth: AuthContext;
  classes?: Paginated<ClassWithOthers>;
}

const SchoolStaffClassFilter = ({ auth, classes }: Props) => {
  const [classType, setClassType] = useState<"all" | "main" | "sub">("all");

  // Determine endpoint based on selected class type
  const getEndpoint = () => {
    switch (classType) {
      case "main":
        return `/school/classes/main-classes/with-details`;
      case "sub":
        return `/school/classes/subclasses/with-details`;
      default:
        return `/school/classes/with-others`;
    }
  };

  const { loading, pagination, handleSearch, handlePageChange } =
    useFilterData<ClassWithOthers>({
      auth,
      endpoint: getEndpoint(),
      initialData: {
        data: classes?.data ?? [],
        total: classes?.total ?? 0,
        total_pages: classes?.total_pages ?? 1,
        current_page: classes?.current_page ?? 1,
      },
      realtimeKey: "class",
      // Note: If your hook doesn't automatically refetch when the endpoint prop changes,
      // you may need to ensure useFilterData has [endpoint] in its useEffect dependency array.
    });

  return (
    <PageFilter>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />

          <SearchBox
            onSearch={handleSearch}
            placeholder="Search class..."
            loading={loading}
          />

          <div>
            <Select
              value={classType}
              onValueChange={(value: "all" | "main" | "sub") =>
                setClassType(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select class type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All classes</SelectItem>
                  <SelectItem value="main">Main classes</SelectItem>
                  <SelectItem value="sub">Sub classes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
          <ClassDialog auth={auth} isSchool />
        </div>
      </div>

      <Separator />
    </PageFilter>
  );
};

export default SchoolStaffClassFilter;
