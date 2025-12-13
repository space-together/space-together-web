import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface SectorsListItemsByCurriculumProps {
  auth: AuthContext;
  curriculum: string[];
}

const SectorsListItemsByCurriculum = async ({
  auth,
  curriculum,
}: SectorsListItemsByCurriculumProps) => {
  const [sectorsRes] = await Promise.all([
    apiRequest<{ ids?: string[] }, SectorModel[]>(
      "post",
      `/sectors/by-ids`,
      { ids: curriculum },
      { token: auth.token },
    ),
  ]);

  return (
    <div className=" flex flex-col gap-2">
      {sectorsRes.data?.map((sector) => (
        <Item
          key={sector._id || sector.name}
          variant="outline"
          className="flex flex-row"
        >
          <ItemContent className="flex flex-row gap-2">
            {sector.logo && (
              <MyImage
                src={sector.logo}
                className="size-12"
                classname=" object-contain"
              />
            )}
            <div>
              <ItemTitle>{sector.name}</ItemTitle>
              <ItemDescription>{sector.description}</ItemDescription>
            </div>
          </ItemContent>

          <ItemActions>
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
};

export default SectorsListItemsByCurriculum;
