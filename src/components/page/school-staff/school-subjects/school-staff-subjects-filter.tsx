"use client";

import SearchBox from "@/components/common/form/search-box";
import PageFilter from "@/components/common/pages/page-filter";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useRef, useState } from "react";
import SubjectDialog from "../../class/dialog/subject-dialog";

interface SchoolStaffSubjectFilterProps {
  auth: AuthContext;
  subjects?: Paginated<ClassSubjectWithRelations>; // 👈 default data
}

const SchoolStaffSubjectFilter = ({
  auth,
  subjects,
}: SchoolStaffSubjectFilterProps) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // 🔹 default state tracker
  const isDefault = useRef(true);

  const { data, addItem, deleteItem } =
    useRealtimeData<ClassSubjectWithRelations>("class_subject");

  // 🔹 Load default class subjects ONCE
  useEffect(() => {
    subjects?.data.forEach(addItem);
  }, []);

  const fetchClassSubjects = useCallback(
    async (filterValue: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          limit: LIMIT.toString(),
        });

        if (filterValue) {
          params.set("filter", filterValue);
        }

        const res = await apiRequest<
          void,
          Paginated<ClassSubjectWithRelations>
        >(
          "get",
          `/school/class-subjects/others?${params.toString()}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
            realtime: "class_subject",
          },
        );

        if (res?.data?.data) {
          data.forEach((t) => deleteItem(t._id || t.id || ""));
          res.data.data.forEach(addItem);
          isDefault.current = false;
        }
      } catch (err) {
        console.error("Failed to fetch subject classes:", err);
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
      data.forEach((t) => deleteItem(t._id || t.id || ""));
      subjects?.data.forEach(addItem);
      isDefault.current = true;
      return;
    }

    fetchClassSubjects(value);
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

        <SubjectDialog auth={auth} />
      </div>

      <Separator />
    </PageFilter>
  );
};

export default SchoolStaffSubjectFilter;
