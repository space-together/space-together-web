import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { weekDays } from "@/lib/const/common-details-const";
import { ChevronDown } from "lucide-react";

interface TeacherDashboardTimetableProps {
  auth?: any;
}

const TeacherDashboardTimetable = ({
  auth,
}: TeacherDashboardTimetableProps) => {
  const morningRow = [
    { time: "9:00 - 9:40", class: "L3 SOD", subject: "Kiny" },
    { time: "9:40 - 10:20", class: "L3 SOD", subject: "Kiny" },
    { time: "10:20 - 11:00", class: "L3 SOD", subject: "Kiny" },
    { time: "11:20 - 11:40", class: "Morning Break", isBreak: true },
    { time: "11:40 - 12:20", class: "L3 SOD", subject: "Kiny" },
    { time: "12:20 - 13:00", class: "L3 SOD", subject: "Kiny" },
  ];

  const afternoonRow = [
    { time: "13:00 - 14:00", class: "Lunch time", isBreak: true },
    { time: "14:00 - 14:40", class: "L3 SOD", subject: "Kiny" },
    { time: "14:40 - 15:20", class: "L3 SOD", subject: "Kiny" },
    { time: "15:20 - 15:40", class: "Break", isBreak: true },
    { time: "15:40 - 16:20", class: "L3 SOD", subject: "Kiny" },
    { time: "16:20 - 17:00", class: "L3 SOD", subject: "Kiny" },
  ];
  return (
    <Card className=" gap-0 pb-0">
      <CardHeader className=" flex justify-between items-center">
        <CardTitle>Today timetable</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button library="daisy" variant="primary">
              Monday <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" w-fit space-y-1 p-2">
            {weekDays.map((day) => (
              <Button
                size="sm"
                variant={"ghost"}
                className=" justify-start card"
                key={day}
              >
                {day}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          <Table className="overflow-hidden">
            <TableBody>
              {/* Morning Row */}
              <TableRow className="hover:bg-transparent border-b">
                {/* Left Header Cell */}
                <TableCell className="bg-base-content/10 border-r font-bold   text-center ">
                  <div className="-rotate-90 whitespace-nowrap uppercase tracking-widest text-xs">
                    AM
                  </div>
                </TableCell>

                {morningRow.map((slot, index) => (
                  <TableCell
                    key={index}
                    className={`border-r  p-3 align-top min-w-[140px] ${slot.isBreak ? "bg-primary/10" : ""}`}
                  >
                    <div className="text-[11px] font-medium text-base-content/50 mb-3">
                      {slot.time}
                    </div>
                    <div className="flex flex-row  w-full justify-between">
                      <span className="text-base font-medium ">
                        {slot.class}
                      </span>
                      <span className="text-sm  ">{slot.subject}</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              {/* Afternoon/Lunch Row */}
              <TableRow className="hover:bg-transparent">
                {/* Left Header Cell (Optional or empty to match style) */}
                <TableCell className="bg-base-content/10 border-r font-bold    text-center p-0 rounded-bl-[var(--radius-box)]  ">
                  <div className="-rotate-90 whitespace-nowrap uppercase tracking-widest text-xs ">
                    PM
                  </div>
                </TableCell>

                {afternoonRow.map((slot, index) => (
                  <TableCell
                    key={index}
                    className={`border-r p-3 align-top  ${slot.isBreak ? "bg-primary/10" : ""}`}
                  >
                    <div className="text-[11px] font-medium text-base-content/50 mb-3">
                      {slot.time}
                    </div>
                    <div className="flex flex-row  w-full justify-between">
                      <span className="text-base font-medium ">
                        {slot.class}
                      </span>
                      <span className="text-sm  ">{slot.subject}</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherDashboardTimetable;
