"use client";
import SearchBox from "@/components/common/form/search-box";
import ChangeDisplay from "@/components/display/change-diplay";
import { Separator } from "@/components/ui/separator";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useState } from "react";
import SubjectDialog from "../../class/dialog/subject-dialog";

interface SchoolStaffSubjectFilterProps {
  auth: AuthContext;
}

const SchoolStaffSubjectFilter = ({ auth }: SchoolStaffSubjectFilterProps) => {
  const [loading, setLoading] = useState(false);
  const { data, addItem, deleteItem } =
    useRealtimeData<ClassSubjectWithRelations>("class_subject");

  async function fetchClassSubjects(filter?: string) {
    setLoading(true);
    try {
      const url = filter
        ? `/school/class-subjects/others?filter=${encodeURIComponent(filter)}`
        : `/school/class-subjects/others?limit=9`;

      const res = await apiRequest<void, Paginated<ClassSubjectWithRelations>>(
        "get",
        url,
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
          realtime: "class_subject",
        },
      );

      if (res?.data?.data) {
        data?.forEach((t) => deleteItem(t._id || t.id || ""));
        res.data.data.forEach((t) => addItem(t));
      }
    } catch (err) {
      console.error("Failed to fetch subject classes:", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <ChangeDisplay />
          {/* Reusable SearchBox */}
          <SearchBox
            onSearch={fetchClassSubjects}
            placeholder="Search teacher..."
            loading={loading}
            live
          />
        </div>

        <SubjectDialog auth={auth} />
      </div>
      <Separator />
    </div>
  );
};

export default SchoolStaffSubjectFilter;
