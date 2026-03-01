"use client";

import { OTPInput as OTPInputComponent, type SlotProps } from "input-otp";
import { useId } from "react";

import { cn } from "@/lib/utils";

export interface OTPInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function OTPInput({
  value,
  onChange,
  label,
  maxLength = 4,
  disabled,
  error,
  className,
}: OTPInputProps) {
  const id = useId();

  return (
    <div className={cn("", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <OTPInputComponent
        id={id}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled}
        containerClassName={cn(
          "flex gap-2 w-fit",
          disabled && "opacity-50 pointer-events-none",
        )}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <OTPSlot key={idx} {...slot} />
            ))}
          </div>
        )}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function OTPSlot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md border bg-background",
        "text-sm font-medium text-foreground shadow-sm transition",
        "border-base-content/50",
        props.isActive && "border-ring ring-2 ring-ring/40",
      )}
    >
      {props.char ?? ""}
    </div>
  );
}
