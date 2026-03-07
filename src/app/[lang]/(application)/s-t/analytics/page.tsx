import AttendanceCard from "@/components/analytics/attendance-card";
import EnrollmentChart from "@/components/analytics/enrollment-chart";
import FeeSummaryCard from "@/components/analytics/fee-summary-card";
import PassFailChart from "@/components/analytics/pass-fail-chart";
import TeacherWorkloadChart from "@/components/analytics/teacher-workload-chart";
import AccessDenied from "@/components/common/access-denied";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import { authContext } from "@/lib/utils/auth-context";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Analytics Dashboard",
    description: "School performance analytics and insights",
  };
};

const AnalyticsPage = async (props: { params: Promise<{ lang: string }> }) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return <NotFoundPage message="You need to have school to view this page" />;
  }

  // Only SCHOOLSTAFF with Director role can access analytics
  if (auth.user.role !== "SCHOOLSTAFF") {
    return (
      <AccessDenied
        title="Access Denied"
        message="Only school directors can access the analytics dashboard."
        backHref={`/${lang}/s-t`}
        backLabel="Back to Dashboard"
      />
    );
  }

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Analytics Dashboard"
        description="Comprehensive insights into school performance and operations"
      />

      {/* Fee Summary Cards */}
      <FeeSummaryCard
        token={auth.token}
        schoolToken={auth.schoolToken ?? undefined}
      />

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <EnrollmentChart
          token={auth.token}
          schoolToken={auth.schoolToken ?? undefined}
        />
        <AttendanceCard
          token={auth.token}
          schoolToken={auth.schoolToken ?? undefined}
        />
        <PassFailChart
          token={auth.token}
          schoolToken={auth.schoolToken ?? undefined}
        />
        <TeacherWorkloadChart
          token={auth.token}
          schoolToken={auth.schoolToken ?? undefined}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
