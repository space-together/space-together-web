"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, type inputProps } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import DateStringInput, {
  type DateStringInputProps,
} from "@/components/common/form/date-input";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleSelector from "@/components/ui/multiselect";
import type { CommonDetails } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import UploadImage, { type updateImageProps } from "../cards/form/upload-image";
import SelectWithSearch from "../select-with-search";
import { UploadAvatar, type UploadAvatarProps } from "./avatar-upload";
import CheckboxInput, { type CheckboxInputProps } from "./checkbox-input";
import type { TimeInputProps } from "./time-input";
import TimeInput from "./time-input";

interface CommonFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  className?: string;
  classname?: string;

  fieldType?:
    | "input"
    | "select"
    | "textarea"
    | "image"
    | "avatar"
    | "checkbox"
    | "checkbox-input"
    | "date"
    | "searchSelect"
    | "time"
    | "multipleSelect";
  selectOptions?: { value: string; label: string; disable?: boolean }[];
  items?: Record<string, CommonDetails>;
  // components props
  imageProps?: updateImageProps;
  inputProps?: inputProps;
  avatarProps?: Pick<UploadAvatarProps, "avatarProps">;
  dateProps?: DateStringInputProps;
  timeProps?: TimeInputProps;
  checkboxInputProps?: CheckboxInputProps;
}

export function CommonFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  disabled = false,
  required = false,
  type = "text",
  fieldType = "input",
  selectOptions = [],
  description,
  className,
  classname,
  imageProps,
  inputProps,
  avatarProps = { avatarProps: { size: "3xl" } },
  dateProps,
  timeProps,
  items,
  checkboxInputProps,
}: CommonFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const stringValue = field.value?.toString() ?? "";

        // Decide what to render based on fieldType
        const renderField = () => {
          switch (fieldType) {
            case "textarea":
              return (
                <Textarea
                  {...field}
                  disabled={disabled}
                  placeholder={placeholder}
                  value={stringValue}
                  className={className}
                />
              );

            case "image":
              return (
                <UploadImage
                  value={stringValue}
                  disabled={disabled}
                  onChange={field.onChange}
                  description={imageProps?.description}
                  className={className}
                  {...imageProps}
                />
              );

            case "avatar":
              return (
                <UploadAvatar
                  value={stringValue}
                  disabled={disabled}
                  onChange={field.onChange}
                  className={className}
                  description={description}
                  {...avatarProps}
                />
              );

            case "select":
              return (
                <Select
                  onValueChange={field.onChange}
                  value={stringValue}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger className={className}>
                      <SelectValue
                        placeholder={
                          placeholder || `Select ${label.toLowerCase()}`
                        }
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {selectOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );

            case "checkbox":
              return (
                <Checkbox
                  {...field}
                  disabled={disabled}
                  value={stringValue}
                  className={className}
                />
              );

            case "checkbox-input":
              if (!items) return <div>No items provided</div>;
              return (
                <CheckboxInput
                  showTooltip
                  items={items}
                  values={field.value}
                  onChange={field.onChange}
                  classname={cn(" grid-cols-3 gap-2", className)}
                  disabled={disabled}
                  {...checkboxInputProps}
                />
              );

            case "date":
              return (
                <DateStringInput
                  value={stringValue}
                  onChange={field.onChange}
                  disabled={disabled}
                  {...dateProps}
                />
              );
            case "time":
              return (
                <TimeInput
                  value={stringValue}
                  onChange={field.onChange}
                  disabled={disabled}
                  {...timeProps}
                />
              );

            case "multipleSelect":
              return (
                <MultipleSelector
                  value={field.value ?? []}
                  onChange={field.onChange}
                  defaultOptions={selectOptions.map((item) => ({
                    value: item.value,
                    label: item.label,
                    disable: item.disable,
                  }))}
                  placeholder={placeholder}
                  hidePlaceholderWhenSelected
                />
              );
            case "searchSelect":
              return (
                <SelectWithSearch
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  options={selectOptions.map((item) => ({
                    value: item.value,
                    label: item.label,
                    disable: item.disable,
                  }))}
                  placeholder={placeholder}
                  disabled={disabled}
                />
              );

            default:
              return (
                <Input
                  {...field}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                  value={stringValue}
                  className={className}
                  {...inputProps}
                />
              );
          }
        };

        return (
          <FormItem
            className={cn(
              "flex flex-col ",
              fieldType === "checkbox" && " flex flex-row-reverse w-fit",
              classname,
            )}
          >
            <FormLabel>
              {label} {required && <span className="text-error">*</span>}
            </FormLabel>

            <FormControl>{renderField()}</FormControl>
            <FormMessage />
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
}
