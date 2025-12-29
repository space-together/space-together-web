"use client";

import { Phone } from "lucide-react";
import { forwardRef } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* ---------------------------------------------
 * Types
 * -------------------------------------------- */

export type PhoneInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  defaultCountry?: RPNInput.Country;
  placeholder?: string;
  className?: string;
};

/* ---------------------------------------------
 * Country Select
 * -------------------------------------------- */

type CountrySelectProps = {
  value?: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value?: RPNInput.Country }[];
};

const CountrySelect = ({ value, onChange, options }: CountrySelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as RPNInput.Country)}
    >
      <SelectTrigger className="flex w-20 items-center gap-2 border-0 ring-0">
        <FlagComponent country={value || "RW"} countryName={value || "RW"} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value ?? option.label}
            value={option.value ?? "default"}
          >
            {option.label}
            {option.value &&
              ` +${RPNInput.getCountryCallingCode(option.value)}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

/* ---------------------------------------------
 * Flag
 * -------------------------------------------- */

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = country ? flags[country] : null;

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? <Flag title={countryName} /> : <Phone size={16} />}
    </span>
  );
};

/* ---------------------------------------------
 * Input
 * -------------------------------------------- */

const PhoneTextInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn("-ms-px rounded-s-none shadow-none", className)}
    {...props}
  />
));

PhoneTextInput.displayName = "PhoneTextInput";

/* ---------------------------------------------
 * Exported Field
 * -------------------------------------------- */

export default function PhoneInput({
  value,
  onChange,
  disabled,
  defaultCountry = "RW",
  placeholder = "Enter phone number",
  className,
}: PhoneInputProps) {
  return (
    <RPNInput.default
      value={value}
      onChange={(v) => onChange?.(v ?? "")}
      international
      disabled={disabled}
      defaultCountry={defaultCountry}
      placeholder={placeholder}
      className={cn("flex rounded-lg border", className)}
      countrySelectComponent={CountrySelect}
      flagComponent={FlagComponent}
      inputComponent={PhoneTextInput}
    />
  );
}
