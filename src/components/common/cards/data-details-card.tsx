import MyImage from "@/components/common/myImage";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MyLink, { LoadingIndicatorText } from "../myLink";

export interface dataDetailsCardProps {
  title: string;
  icon: string;
  size: string | number | undefined;
  link?: string;
  items?: {
    key: string;
    value: string | number;
  }[];
  ClassNameItems?: string;
}

const DataDetailsCard = ({
  title,
  icon,
  size,
  items,
  link,
  ClassNameItems,
}: dataDetailsCardProps) => {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b-0">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle>
              {link ? (
                <MyLink href={link}>
                  <LoadingIndicatorText title={title} element={"span"}>
                    {title}
                  </LoadingIndicatorText>
                </MyLink>
              ) : (
                title
              )}
            </CardTitle>
            <span className="text-2xl font-semibold">{size}</span>
          </div>
          <MyImage
            priority
            original
            src={icon}
            className="size-12"
            alt={`icon: ${icon}`}
          />
        </div>
        <div className={cn("grid grid-cols-2 gap-2", ClassNameItems)}>
          {!!items &&
            items.map((item, i) => (
              <div key={`data-details-items-${i}`} className={cn("flex gap-1")}>
                <span className="line-clamp-1 text-sm">{item.key}:</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
        </div>
      </CardHeader>
    </Card>
  );
};

export default DataDetailsCard;
