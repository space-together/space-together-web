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

import AddressInput, {
  type AddressInputProps,
} from "@/components/common/form/address-input";
import AgeInput, {
  type AgeDateInputProps,
} from "@/components/common/form/age-input";
import DateStringInput, {
  type DateStringInputProps,
} from "@/components/common/form/date-input";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleSelector from "@/components/ui/multiselect";
import type { CommonDetails, Option } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import UploadImage, { type updateImageProps } from "../cards/form/upload-image";
import SelectWithSearch from "../select-with-search";
import { UploadAvatar, type UploadAvatarProps } from "./avatar-upload";
import CheckboxInput, { type CheckboxInputProps } from "./checkbox-input";
import MessageInput, {
  type MessageInputProps,
} from "./message-input/message-input";
import type { OTPInputProps } from "./OTP-input";
import OTPInput from "./OTP-input";
import type { PhoneInputProps } from "./phone-input";
import PhoneInput from "./phone-input";
import type { RadioInputProps } from "./radio-input";
import RadioInput from "./radio-input";
import type { SignToInputProps } from "./sign-to-input";
import type { TimeInputProps } from "./time-input";
import TimeInput from "./time-input";
import SignToInput from "./sign-to-input";

interface CommonFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string | React.ReactNode;
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
    | "radio-input"
    | "date"
    | "searchSelect"
    | "time"
    | "multipleSelect"
    | "otp-input"
    | "phone"
    | "address"
    | "age"
    | "custom"
    | "message"
    | "sign-to";
  render?: (props: {
    field: ControllerRenderProps<T, FieldPath<T>>;

    disabled: boolean;
  }) => React.ReactNode;
  selectOptions?: Option[];
  items?: Record<string, CommonDetails>;
  // components props
  imageProps?: updateImageProps;
  inputProps?: inputProps;
  avatarProps?: Pick<UploadAvatarProps, "avatarProps">;
  dateProps?: DateStringInputProps;
  timeProps?: TimeInputProps;
  checkboxInputProps?: CheckboxInputProps;
  otpInputProps?: OTPInputProps;
  phoneProps?: Omit<PhoneInputProps, "value" | "onChange">;
  radioInputProps?: RadioInputProps;
  addressProps?: AddressInputProps;
  ageProps?: AgeDateInputProps;
  messageInputProps?: MessageInputProps;
  signToInput?: SignToInputProps;
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
  render,
  imageProps,
  inputProps,
  avatarProps = { avatarProps: { size: "3xl" } },
  dateProps,
  timeProps,
  items,
  checkboxInputProps,
  radioInputProps,
  otpInputProps,
  phoneProps,
  addressProps,
  ageProps,
  messageInputProps,
  signToInput,
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
                          placeholder ||
                          (typeof label === "string"
                            ? `Select ${label.toLowerCase()}`
                            : "Select")
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
                  checked={field.value}
                  className={className}
                  onCheckedChange={field.onChange}
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

            case "radio-input":
              if (!items) return <div>No items provided</div>;
              return (
                <RadioInput
                  showTooltip
                  items={items}
                  value={field.value}
                  onChange={field.onChange}
                  classname={cn(" grid-cols-3 gap-2", className)}
                  disabled={disabled}
                  {...radioInputProps}
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
            case "otp-input":
              return (
                <OTPInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  disabled={disabled}
                  className={className}
                  {...otpInputProps}
                />
              );

            case "phone":
              return (
                <PhoneInput
                  value={stringValue}
                  onChange={field.onChange}
                  disabled={disabled}
                  className={className}
                  {...phoneProps}
                />
              );

            case "address":
              return (
                <AddressInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  className={className}
                  {...addressProps}
                />
              );
            case "age":
              return (
                <AgeInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  className={className}
                  {...ageProps}
                />
              );

            case "custom":
              if (!render) {
                return (
                  <div className="text-error text-sm">
                    Custom field requires a render prop
                  </div>
                );
              }
              return render({ field, disabled });

            case "message":
              return (
                <MessageInput
                  disabled={disabled}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder={placeholder}
                  {...messageInputProps}
                />
              );

            case "sign-to":
              return (
                <SignToInput
                  disabled={disabled}
                  onChange={field.onChange as (value: any[]) => void}
                  value={field.value}
                  placeholder={placeholder}
                  {...signToInput}
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
