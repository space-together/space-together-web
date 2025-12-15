import { UserSmCard } from "@/components/cards/user-card";
import MyAvatar from "@/components/common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface SchoolStaffDashboardProps {
  auth: AuthContext;
  school: School;
  lang: Locale;
}

const SchoolStaffDashboard = ({
  auth,
  lang,
  school,
}: SchoolStaffDashboardProps) => {
  return (
    <div className=" flex justify-between">
      <div className=" flex flex-row gap-2">
        <MyAvatar
          src={school.logo}
          size="xl"
          type="square"
          classname=" object-contain"
        />
        <div>
          <h1 className="h4">{school.name}</h1>
          <MyLink href={`/${lang}/school`}>
            <LoadingIndicatorText>@ {school.username}</LoadingIndicatorText>
          </MyLink>
        </div>
      </div>
      <div>
        {auth.user && (
          <UserSmCard
            role={auth.user.role}
            image={auth.user.image}
            name={auth.user.name}
          />
        )}
      </div>
    </div>
  );
};

export default SchoolStaffDashboard;
