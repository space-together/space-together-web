import { ItemGroupSkeleton } from "@/components/common/skeletons/item-skeleton";
import SectorsListItemsByCurriculum from "@/components/page/admin/sector/sectors-list-items";
import TradesListItemsByTrades from "@/components/page/admin/trades/trades-list-items";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Suspense } from "react";
import AddCurriculumInSchoolDialog from "./add-curriculum-in-school-dailog";

interface SchoolCurriculumSettingCardProps {
  auth: AuthContext;
  school: School;
}

const SchoolCurriculumSettingCard = ({
  auth,
  school,
}: SchoolCurriculumSettingCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>School curriculum Settings</CardTitle>
        <CardDescription>
          Manage your school's curriculum settings.
        </CardDescription>
      </CardHeader>
      <CardContent className=" flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className=" flex items-center justify-between">
            <h4 className="h4">Educations</h4>
            <AddCurriculumInSchoolDialog auth={auth} />
          </div>
          <div className=" flex flex-col gap-2">
            {school.curriculum && (
              <Suspense
                fallback={<ItemGroupSkeleton item={{ showHeader: false }} />}
              >
                <SectorsListItemsByCurriculum
                  auth={auth}
                  curriculum={school.curriculum}
                />
              </Suspense>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className=" flex items-center justify-between">
            <h4 className="h4">Trades</h4>
            <Button
              variant="outline"
              library="daisy"
              className=" w-fit"
              role="create"
            >
              Add Trade
            </Button>
          </div>
          <div className=" flex flex-col gap-2">
            {school.education_level && (
              <Suspense
                fallback={<ItemGroupSkeleton item={{ showHeader: false }} />}
              >
                <TradesListItemsByTrades
                  auth={auth}
                  trades_ids={school.education_level}
                />
              </Suspense>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolCurriculumSettingCard;
