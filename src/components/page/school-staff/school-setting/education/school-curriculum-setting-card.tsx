import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { AuthContext } from "@/lib/utils/auth-context";

interface SchoolCurriculumSettingCardProps {
  auth: AuthContext;
}

const SchoolCurriculumSettingCard = ({
  auth,
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
          <h4 className="h4">Educations</h4>
          <div className=" flex flex-col gap-2">
            {[...Array(3)].map((_, i) => {
              return (
                <Item key={i} variant="outline" className=" flex flex-row ">
                  <ItemContent className="flex flex-row gap-2">
                    <MyImage src="/icons/apple.png" className=" size-8" />
                    <div>
                      <ItemTitle>Education name</ItemTitle>
                      <ItemDescription>
                        A simple item with title and description.
                      </ItemDescription>
                    </div>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </ItemActions>
                </Item>
              );
            })}
          </div>
          <Button
            variant="outline"
            library="daisy"
            className=" w-fit"
            role="create"
          >
            Add Education
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="h4">Trades</h4>
          <div className=" flex flex-col gap-2">
            {[...Array(3)].map((_, i) => {
              return (
                <Item key={i} variant="outline" className=" flex flex-row ">
                  <ItemContent className="flex flex-row gap-2">
                    <div>
                      <ItemTitle>Education name</ItemTitle>
                      <ItemDescription>
                        A simple item with title and description.
                      </ItemDescription>
                    </div>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </ItemActions>
                </Item>
              );
            })}
          </div>
          <Button
            variant="outline"
            library="daisy"
            className=" w-fit"
            role="create"
          >
            Add Trade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolCurriculumSettingCard;
