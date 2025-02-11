import { auth } from "@/auth";
import PageTitle from "@/components/my-components/page-title";
import CollectionInDatabase from "@/components/site/dashboard/collections/collection-in-database";
import HeroDashboard from "@/components/site/dashboard/hero-dashboard";
import RequestAndMessagesDashboard from "@/components/site/dashboard/requests/request-and-messages";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}

const Dashboard = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  if (user.role !== "ADMIN")
    return redirect(
      `/${lang}/${
        user.role === "PARENT"
          ? "/PARENT"
          : user.role === "STUDENT"
          ? "/class"
          : user.role === "TEACHER"
          ? "/teacher"
          : "school-staff"
      }`
    );
  return (
    <div className=" happy-page">
      <PageTitle title="Dashboard" />
      <div className=" happy-line gap-4">
        <HeroDashboard />
        <CollectionInDatabase />
      </div>
      {/* errors and request */}
      <div>
        <RequestAndMessagesDashboard />
      </div>
      <div className=" h-screen "></div>
    </div>
  );
};

export default Dashboard;
