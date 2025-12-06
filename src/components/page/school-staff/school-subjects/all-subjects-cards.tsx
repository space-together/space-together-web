"use client";
import SubjectCard from "@/components/cards/subject-card";
import CommonEmpty from "@/components/common/common-empty";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";
import SubjectDialog from "../../class/dialog/subject-dialog";

interface AllSubjectsCardProps {
  lang: Locale;
  auth: AuthContext;
  subjects: ClassSubjectWithRelations[];
  realtimeEnabled?: boolean;
}

const AllSubjectsCard = ({
  subjects,
  realtimeEnabled,
  auth,
  lang,
}: AllSubjectsCardProps) => {
  const { data: initialSubjects } =
    useRealtimeData<ClassSubjectWithRelations>("class_subject");
  const [displaySubjects, setDisplaySubjects] =
    useState<ClassSubjectWithRelations[]>(subjects);

  useEffect(() => {
    if (realtimeEnabled && initialSubjects) {
      setDisplaySubjects(initialSubjects as ClassSubjectWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplaySubjects(initialSubjects);
    }
  }, [initialSubjects, realtimeEnabled]);

  if (displaySubjects.length === 0 && subjects.length === 0)
    return (
      <CommonEmpty
        title="School subjects not found"
        description="They are currently no school subjects found, please create one. If you are an admin, you can create a new school subject."
        auth={auth}
      >
        <SubjectDialog auth={auth} />
      </CommonEmpty>
    );
  return (
    <div className=" grid grid-cols-2 gap-4">
      {displaySubjects.map((subject) => {
        return (
          <SubjectCard
            lang={lang as Locale}
            auth={auth}
            key={subject._id || subject.id}
            subject={subject}
          />
        );
      })}
    </div>
  );
};

export default AllSubjectsCard;
