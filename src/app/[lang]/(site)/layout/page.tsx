"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown, Phone } from "lucide-react";
import React, { forwardRef } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

// Schema validation with zod
const FormSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required").regex(/^\+250[0-9]{9}$/, "Invalid phone number"),
});

export default function PhoneNumberForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Controller
                  name={field.name}
                  control={form.control}
                  render={({ field }) => (
                    <RPNInput.default
                      {...field}
                      className="flex rounded-lg shadow-sm shadow-black/5"
                      international
                      flagComponent={FlagComponent}
                      countrySelectComponent={CountrySelect}
                      inputComponent={PhoneInput}
                      defaultCountry="RW"
                      placeholder="Enter phone number"
                      onChange={(value) => field.onChange(value ?? "")}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const PhoneInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn("-ms-px rounded-s-none shadow-none focus-visible:z-10", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({ value, onChange, options }: CountrySelectProps) => {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as RPNInput.Country)}>
      <SelectTrigger className="flex items-center">
        <FlagComponent country={value} countryName={value} />
        <span>{value ? options.find((o) => o.value === value)?.label : "Select a country"}</span>
        <ChevronDown className="ml-2" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value || "default"}>
            {option.label} {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? <Flag title={countryName} /> : <Phone size={16} aria-hidden="true" />}
    </span>
  );
};
