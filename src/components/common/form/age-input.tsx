"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Age } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

export interface AgeDateInputProps {
  value?: Age | string | Date | null;
  onChange?: (value?: Age | string | null) => void;
  output?: "age" | "iso";
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AgeDateInput({
  value,
  onChange,
  output = "age",
  label,
  disabled,
  error,
  className,
}: AgeDateInputProps) {
  const now = new Date();
  const minYear = now.getFullYear() - 95;
  const maxYear = now.getFullYear() - 3;

  // 1. Create internal state to track partial selections
  const [internalDate, setInternalDate] = useState({
    month: "",
    day: "",
    year: "",
  });

  // 2. Sync internal state when the external 'value' changes
  // 2. Sync internal state when the external 'value' changes
  useEffect(() => {
    if (!value) {
      setInternalDate({ month: "", day: "", year: "" });
      return;
    }

    let d: Date | null = null;

    if (value instanceof Date) {
      d = value;
    } else if (typeof value === "string") {
      d = new Date(value);
    } else if (typeof value === "object" && "year" in value) {
      // Correctly handle the Age object type
      d = new Date(value.year, value.month - 1, value.day);
    }

    if (d && !isNaN(d.getTime())) {
      setInternalDate({
        // Ensure month and day are strings that match your SelectItem values
        month: (d.getMonth() + 1).toString(),
        day: d.getDate().toString(),
        year: d.getFullYear().toString(),
      });
    }
  }, [value]);

  const years = useMemo(() => {
    const items = [];
    for (let i = maxYear; i >= minYear; i--) items.push(i.toString());
    return items;
  }, [minYear, maxYear]);

  const days = useMemo(() => {
    const items = [];
    // Optional: You could calculate days in month based on internalDate.month/year
    for (let i = 1; i <= 31; i++) items.push(i.toString());
    return items;
  }, []);

  // 3. Updated handler
  const handleUpdate = (part: "month" | "day" | "year", newVal: string) => {
    const updated = { ...internalDate, [part]: newVal };

    // Update local UI immediately so the Select shows the value
    setInternalDate(updated);

    // Only fire onChange if the date is complete and valid
    if (updated.month && updated.day && updated.year) {
      const d = new Date(
        Number(updated.year),
        Number(updated.month) - 1,
        Number(updated.day),
      );

      // Validation check for dates like Feb 31
      if (d.getMonth() === Number(updated.month) - 1) {
        if (output === "age") {
          onChange?.({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
          });
        } else {
          onChange?.(d.toISOString());
        }
      }
    }
  };

  return (
    <div className={cn("flex flex-col space-y-2 w-full max-w-xl", className)}>
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {label}
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-3">
        {/* Month */}
        <div className="col-span-5">
          <Select
            disabled={disabled}
            value={internalDate.month} // Use internal state
            onValueChange={(v) => handleUpdate("month", v)}
          >
            <SelectTrigger className="h-14 pt-5 relative">
              <span className="absolute left-3 top-2 text-xs text-muted-foreground">
                Month
              </span>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className=" overflow-y-auto max-h-60">
              {MONTHS.map((m, i) => (
                <SelectItem key={m} value={(i + 1).toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Day */}
        <div className="col-span-3">
          <Select
            disabled={disabled}
            value={internalDate.day} // Use internal state
            onValueChange={(v) => handleUpdate("day", v)}
          >
            <SelectTrigger className="h-14 pt-5 relative">
              <span className="absolute left-3 top-2 text-xs text-muted-foreground">
                Day
              </span>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className=" overflow-y-auto max-h-60">
              {days.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="col-span-4">
          <Select
            disabled={disabled}
            value={internalDate.year} // Use internal state
            onValueChange={(v) => handleUpdate("year", v)}
          >
            <SelectTrigger className="h-14 pt-5 relative">
              <span className="absolute left-3 top-2 text-xs text-muted-foreground">
                Year
              </span>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className=" overflow-y-auto max-h-60">
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
