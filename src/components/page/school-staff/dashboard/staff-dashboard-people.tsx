import DataDetailsCard, {
  type dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import MyImage from "@/components/common/myImage";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { CountDoc } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface StaffDashboardPeopleProps {
  auth: AuthContext;
  lang: Locale;
}

const StaffDashboardPeople = async ({
  auth,
  lang,
}: StaffDashboardPeopleProps) => {
  const [
    totalStudents,
    totalStudentsMale,
    totalStudentsFemale,
    // teachers
    totalTeachers,
    totalTeachersMale,
    totalTeachersFemale,
    // staffs
    totalStaff,
    totalClasses,
    totalClassSubjects,
  ] = await Promise.all([
    apiRequest<void, CountDoc>("get", "/school/students/count", undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),
    apiRequest<void, CountDoc>(
      "get",
      "/school/students/count?field=gender&&value=MALE",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    apiRequest<void, CountDoc>(
      "get",
      "/school/students/count?field=gender&&value=FEMALE",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    // teachers
    apiRequest<void, CountDoc>("get", "/school/teachers/count", undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),
    apiRequest<void, CountDoc>(
      "get",
      "/school/teachers/count?field=gender&&value=MALE",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    apiRequest<void, CountDoc>(
      "get",
      "/school/teachers/count?field=gender&&value=FEMALE",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    // staffs
    apiRequest<void, CountDoc>("get", "/school/school-staff/count", undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),

    apiRequest<void, CountDoc>("get", "/school/classes/count", undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),
    apiRequest<void, CountDoc>(
      "get",
      "/school/class-subjects/count",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  const totalPeople = [
    totalStudents?.data?.count,
    totalStudentsMale?.data?.count,
    totalTeachers?.data?.count,
    totalStaff?.data?.count,
  ]
    .map((count) => count ?? 0)
    .reduce((sum, count) => sum + count, 0);

  const allUsersComponents: dataDetailsCardProps[] = [
    {
      title: "Students",
      link: `/${lang}/s-t/students`,
      size: totalStudents?.data?.count ?? 0,
      icon: "/icons/student.png",
      items: [
        { key: "Male", value: totalStudentsMale?.data?.count ?? 0 },
        {
          key: "Female",
          value: totalStudentsFemale?.data?.count ?? 0,
        },
      ],
    },
    {
      title: "Teachers",
      link: `/${lang}/s-t/teachers`,
      size: totalTeachers?.data?.count ?? 0,
      icon: "/icons/teacher.png",
      items: [
        { key: "Male", value: totalTeachersMale?.data?.count ?? 0 },
        {
          key: "Female",
          value: totalTeachersFemale?.data?.count ?? 0,
        },
      ],
    },
    {
      title: "Staff",
      link: `/${lang}/s-t/staffs`,
      size: totalStaff?.data?.count ?? 0,
      icon: "/icons/staff.png",
      items: [],
    },
    {
      title: "Classes",
      link: `/${lang}/s-t/classes`,
      size: totalClasses?.data?.count ?? 0,
      icon: "/icons/classroom.png",
      items: [],
    },
    {
      title: "Class Subjects",
      link: `/${lang}/s-t/subjects`,
      size: totalClassSubjects?.data?.count ?? 0,
      icon: "/icons/book.png",
      items: [],
    },
  ];

  return (
    <main className="grid w-full grid-cols-3 gap-4">
      <Card className="pb-0">
        <CardHeader className=" border-b-0">
          <div className=" flex flex-row justify-between">
            <div className=" flex flex-col gap-2">
              <CardTitle>People</CardTitle>
              <span className="h3">{totalPeople}</span>
            </div>
            <MyImage
              src="/icons/people.png"
              alt="People icon"
              className="size-12"
            />
          </div>
          <CardDescription className=" text-sm">
            Total people in the school.
          </CardDescription>
        </CardHeader>
      </Card>
      {allUsersComponents.map((item, i) => (
        <DataDetailsCard
          key={i}
          link={item.link}
          title={item.title}
          icon={item.icon}
          size={item.size}
          items={item.items}
          ClassNameItems={item.ClassNameItems}
        />
      ))}
    </main>
  );
};

export default StaffDashboardPeople;
