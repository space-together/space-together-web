import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import type { EducationYear } from "@/lib/schema/admin/education-year-schema";
import { cn } from "@/lib/utils";
import { formatReadableDate } from "@/lib/utils/format-date";
import { Calendar } from "lucide-react";

interface EducationYearItemsProps {
  years: EducationYear[];
}

const EducationYearItems = ({ years }: EducationYearItemsProps) => {
  return (
    <div>
      {years.map((year) => {
        return (
          <Item key={year._id || ""} variant="base">
            <ItemHeader>
              <ItemTitle className=" h4">{year.label}</ItemTitle>
            </ItemHeader>
            <ItemContent>
              <div className=" flex flex-col gap-2">
                <h5 className="h5">Terms</h5>
                <ul className=" flex flex-col gap-1 ">
                  {year.terms.map((term) => (
                    <li
                      key={term.order}
                      className={cn("flex flex-col items-start gap-0.5 ")}
                    >
                      <div className=" flex justify-between items-center w-full">
                        <div className=" flex flex-row font-medium">
                          <span>{term.order}. </span>
                          <h6 className=" ">{term.name}</h6>
                        </div>
                        <div className=" flex flex-row gap-2">
                          {/*Started*/}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Start on:{" "}
                              {term.start_date
                                ? formatReadableDate(term.start_date)
                                : "—"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              End on:{" "}
                              {term.end_date
                                ? formatReadableDate(term.end_date)
                                : "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </li>
                  ))}
                </ul>
              </div>
              <div className=" flex gap-4">
                {year.created_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {formatReadableDate(year.created_at)}</span>
                  </div>
                )}
                {year.updated_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {formatReadableDate(year.updated_at)}</span>
                  </div>
                )}
              </div>
            </ItemContent>
          </Item>
        );
      })}
    </div>
  );
};

export default EducationYearItems;
