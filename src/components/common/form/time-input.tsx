"use client";

import { DateInput, TimeField } from "@/components/ui/datefield-rac";
import { stringToTimeValue, timeValueToString } from "@/lib/utils/format-date";

import { ClockIcon } from "lucide-react";

export interface TimeInputProps {
  value?: string | null; // "HH:mm"
  onChange?: (value: string | null) => void; // "HH:mm"
  disabled?: boolean;
  className?: string;
}

export default function TimeInput({
  value,
  onChange,
  disabled,
  className,
}: TimeInputProps) {
  return (
    <TimeField
      value={stringToTimeValue(value)}
      onChange={(timeValue) => {
        if (onChange) onChange(timeValueToString(timeValue));
      }}
      isDisabled={disabled}
      className={className}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center justify-center ps-3 text-muted-foreground/80">
          <ClockIcon aria-hidden="true" size={16} />
        </div>
        <DateInput className="ps-9" />
      </div>
    </TimeField>
  );
}
