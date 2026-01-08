import { ClassSmCard } from "@/components/cards/class-card";
import MyLink from "@/components/common/myLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { Class } from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface TeacherDashboardClassesProps {
  classes?: Class[];
  lang: Locale;
  auth: AuthContext;
}

const TeacherDashboardClasses = ({
  classes,
  lang,
  auth,
}: TeacherDashboardClassesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MyLink href={`/${lang}/t/classes`}>4 Classes</MyLink>
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-1">
        {[...Array(4)].map((_, index) => (
          <ClassSmCard key={index} lang={lang} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TeacherDashboardClasses;
