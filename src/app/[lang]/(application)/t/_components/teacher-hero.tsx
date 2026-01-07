import MyAvatar from "@/components/common/image/my-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { School } from "@/lib/schema/school/school-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";

interface TeacherHeroDashboardProps {
  user: UserModel;
  school: School;
}

const TeacherHeroDashboard = ({ user, school }: TeacherHeroDashboardProps) => {
  return (
    <Card>
      <div className="flex flex-row gap-4 items-center">
        <MyAvatar src={user.image} alt={user.name} size="2xl" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Good Morning, {user.name}</h1>
          <p className="text-sm text-muted-foreground">
            Here is how your day will be in {school.name}
          </p>
        </div>
      </div>
      <Button >What's new?</Button>
    </Card>
  );
};

export default TeacherHeroDashboard;
