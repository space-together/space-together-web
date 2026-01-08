import MyAvatar from "@/components/common/image/my-avatar";
import { LoadingIndicatorText } from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface TeacherHeroDashboardProps {
  teacher?: Teacher;
  school?: School;
  lang: Locale;
  auth: AuthContext;
}

const TeacherHeroDashboard = ({
  teacher,
  school,
  lang,
  auth,
}: TeacherHeroDashboardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-row  justify-between items-center">
        <div className="flex flex-row gap-4 ">
          <MyAvatar
            src={teacher?.image ?? auth.user?.image}
            alt={teacher?.name}
            size="lg"
          />
          <div className="flex flex-col  justify-center">
            <h1 className="text-2xl font-bold">
              Good Morning, {teacher?.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Here is how your day will be in {school?.name}
            </p>
          </div>
        </div>
        <Button href={`/${lang}/school`} library="daisy" variant={"secondary"}>
          <LoadingIndicatorText>What's new?</LoadingIndicatorText>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeacherHeroDashboard;
