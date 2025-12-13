"use client";

import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { School } from "@/lib/schema/school/school-schema";
import type { TimetableOverrideType } from "@/lib/schema/school/school-timetable-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

/* ----------------------------- TYPES ----------------------------- */

interface SchoolTimetableChooseEducationProps {
  auth: AuthContext;
  school: School;
  onChange: (choice: SchoolTimetableEducationChoice | null) => void;
}

export interface SchoolTimetableEducationChoice {
  id: string;
  name: string;
  username: string;
  type: TimetableOverrideType;
}

/* ----------------------------- COMPONENT ----------------------------- */

const SchoolTimetableChooseEducation = ({
  auth,
  school,
  onChange,
}: SchoolTimetableChooseEducationProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<SchoolTimetableEducationChoice | null>(
    null,
  );

  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [sectors, setSectors] = useState<SectorModel[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------------- HANDLERS ---------------------- */

  const handleSelect = (choice: SchoolTimetableEducationChoice) => {
    setValue(choice);
    setOpen(false);
    onChange(choice);
  };

  const handleSelectDefault = () => {
    setValue(null);
    setOpen(false);
    onChange(null);
  };

  /* ---------------------- FETCH DATA ---------------------- */

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const [tradesRes, sectorsRes] = await Promise.all([
          apiRequest<{ ids?: string[] }, TradeModule[]>(
            "post",
            `/trades/trades/by_ids`,
            { ids: school.education_level },
            { token: auth.token },
          ),
          apiRequest<{ ids?: string[] }, SectorModel[]>(
            "post",
            `/sectors/by-ids`,
            { ids: school.curriculum },
            { token: auth.token },
          ),
        ]);

        if (tradesRes.data) setTrades(tradesRes.data);
        if (sectorsRes.data) setSectors(sectorsRes.data);
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, [auth.token, school]);

  /* ----------------------------- UI ----------------------------- */

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn(
            "w-[220px] justify-between capitalize",
            loading && "skeleton skeleton-text",
          )}
          title={value ? value.name : "Default timetable"}
        >
          {value ? value.username : "Default timetable"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0">
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Search education..." />
          <CommandList>
            <CommandEmpty>
              {loading ? "Loading..." : "No results found."}
            </CommandEmpty>

            {/* -------- DEFAULT TIMETABLE -------- */}
            <CommandGroup heading="School timetable">
              <CommandItem
                className="cursor-pointer font-medium"
                onSelect={handleSelectDefault}
              >
                Default school timetable
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            {/* -------- CURRICULUM / SECTORS -------- */}
            <CommandGroup heading="Curriculum">
              {sectors.map((sector) => (
                <CommandItem
                  key={sector._id}
                  className="cursor-pointer"
                  onSelect={() =>
                    handleSelect({
                      id: sector._id || sector.id || "",
                      name: sector.name,
                      username: sector.username,
                      type: "Sector",
                    })
                  }
                >
                  {sector.logo && (
                    <MyImage role="ICON" src={sector.logo} alt={sector.name} />
                  )}
                  <span>{sector.username || sector.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* -------- EDUCATION LEVEL / TRADES -------- */}
            <CommandGroup heading="Education level">
              {trades.map((trade) => (
                <CommandItem
                  key={trade._id}
                  className="cursor-pointer"
                  onSelect={() =>
                    handleSelect({
                      id: trade._id || trade.id || "",
                      name: trade.name,
                      username: trade.username,
                      type: "Trade",
                    })
                  }
                >
                  <span>{trade.username || trade.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SchoolTimetableChooseEducation;
