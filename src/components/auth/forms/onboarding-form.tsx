"use client";

import {
  onboardingSchema,
  onboardingSchemaTypes,
} from "@/utils/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authOnboardingFormDiction } from "@/locale/types/authDictionTypes";
import { authUser } from "@/utils/models/userModel";
import { ChangeEvent, useState, useTransition } from "react";
import UseTheme from "@/context/theme/use-theme";
import { FormMessageError, FormMessageSuccess } from "./form-message";
import { Button } from "@/components/ui/button";
import MyImage from "@/components/my-components/myImage";
import { cn } from "@/lib/utils";
import { getLocalTimeZone, today, toZoned } from "@internationalized/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button as ButtonDate,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
} from "react-aria-components";
import * as RPNInput from "react-phone-number-input";
import { BeatLoader } from "react-spinners";
import { Locale } from "@/i18n";
import { onboardingAction } from "@/services/actions/auth/onboarding-action";
import { useRouter } from "next/navigation";
import { toLowerCase } from "@/utils/functions/characters";
import { userRoleContext } from "@/utils/context/user-context";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/form/component-form-need";

interface Props {
  dictionary: authOnboardingFormDiction;
  user: authUser | undefined;
  lang: Locale;
}

const OnboardingForm = ({ dictionary, user, lang }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<onboardingSchemaTypes>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      image: user?.image ?? "",
      age: undefined,
      phone: "",
      gender: undefined,
      role: "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if the file is an image
      if (!file.type.includes("image")) {
        return setError("Please select an image file");
      }

      // Check if the file size is greater than 2MB (2MB = 2 * 1024 * 1024 bytes)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return setError(
          "Sorry your image it to high try other image which is not less than 2MB!."
        );
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const now = today(getLocalTimeZone());

  const onSubmit = (value: onboardingSchemaTypes) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      if (user?.id) {
        const update = await onboardingAction(value, user.id);
        if (update.error) {
          setError(update.error);
        }

        if (update.success) {
          setSuccess(update.success);
          form.reset();
          const role = toLowerCase(update.data.role);
          if (role === "student") {
            return router.push(`/${lang}/class`);
          }
          if (role === "schoolstaff") {
            return router.push(`/${lang}/school-staff`);
          }
          return router.push(`/${lang}/${role}`);
        }
      } else {
        return setError("You must be login to update account!");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-2"
      >
        <div className=" space-y-1">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className={cn("flex gap-2 items-center")}>
                <FormLabel
                  htmlFor="image"
                  className={cn("flex gap-3 items-center")}
                >
                  <MyImage
                    src={field.value ? field.value : user?.image || "/1.jpg"}
                    className={cn("size-32 min-h-32 min-w-32 rounded-full")}
                    classname=" rounded-full"
                    alt="Profile"
                  />
                  <span
                    className={cn(
                      "cursor-pointer",
                      !field.value && "text-info"
                    )}
                  >
                    {dictionary.image}
                  </span>
                </FormLabel>
                <FormControl>
                  <div className={cn("flex flex-col")}>
                    <Input
                      disabled={isPending}
                      type="file"
                      id="image"
                      accept="image/*"
                      placeholder="Add profile photo"
                      className={cn(
                        "border-none outline-none bg-transparent hidden"
                      )}
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* phone number */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.phone}</FormLabel>
                <FormControl>
                  <Controller
                    name={field.name}
                    control={form.control}
                    render={({ field }) => (
                      <RPNInput.default
                        {...field}
                        className="flex rounded-lg w-96 border-l-0"
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
          {/* age */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormControl>
                  <Controller
                    name="age"
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        className="space-y-2"
                        onChange={(selectedDate) => {
                          const currentDate = new Date();
                          if (selectedDate) {
                            const date = selectedDate.toDate();
                            date.setHours(
                              currentDate.getHours(),
                              currentDate.getMinutes(),
                              currentDate.getSeconds(),
                              currentDate.getMilliseconds()
                            );
                            onChange(date);
                          }
                          onChange(selectedDate ? selectedDate.toDate() : null);
                        }}
                        value={
                          value
                            ? toZoned(
                                today(getLocalTimeZone()).set({
                                  year: new Date(value).getFullYear(),
                                  month: new Date(value).getMonth() + 1,
                                  day: new Date(value).getDate(),
                                }),
                                getLocalTimeZone()
                              )
                            : null
                        }
                      >
                        <FormLabel>{dictionary.age}</FormLabel>
                        <div className="flex">
                          <Group className="inline-flex h-10 w-full rounded-md bg-base-100 px-3 py-2 text-base ring-offset-background   items-center overflow-hidden whitespace-nowrap  pe-9 shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none ">
                            <DateInput {...field}>
                              {(segment) =>
                                segment &&
                                (segment.type === "year" ||
                                  segment.type === "month" ||
                                  segment.type === "day") ? (
                                  <>
                                    <DateSegment
                                      segment={segment}
                                      className="inline rounded p-0.5 caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
                                    />
                                    {segment.type !== "year" && <span>/</span>}
                                  </>
                                ) : (
                                  <></>
                                )
                              }
                            </DateInput>
                          </Group>
                          <ButtonDate className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors hover:text-info focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70">
                            <CalendarIcon size={16} strokeWidth={2} />
                          </ButtonDate>
                        </div>
                        <Popover
                          className="z-50 rounded-lg border border-base-300 bg-base-200 shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
                          offset={4}
                          data-theme={UseTheme()}
                        >
                          <Dialog className="max-h-[inherit] overflow-auto p-2">
                            <Calendar className="w-fit">
                              <header className="flex w-full items-center gap-1 pb-1">
                                <ButtonDate
                                  slot="previous"
                                  className="flex size-9 items-center justify-center rounded-lg outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
                                >
                                  <ChevronLeft size={16} strokeWidth={2} />
                                </ButtonDate>
                                <Heading className="grow text-center text-sm font-medium" />
                                <ButtonDate
                                  slot="next"
                                  className="flex size-9 items-center justify-center rounded-lg outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
                                >
                                  <ChevronRight size={16} strokeWidth={2} />
                                </ButtonDate>
                              </header>
                              <CalendarGrid>
                                <CalendarGridHeader>
                                  {(day) => (
                                    <CalendarHeaderCell className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
                                      {day}
                                    </CalendarHeaderCell>
                                  )}
                                </CalendarGridHeader>
                                <CalendarGridBody className="[&_td]:px-0 border-0">
                                  {(date) => (
                                    <CalendarCell
                                      date={date}
                                      className={cn(
                                        "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal outline-offset-2 transition-colors data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[hovered]:bg-accent data-[selected]:bg-info data-[hovered]:text-foreground data-[selected]:text-primary-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70 data-[invalid]:data-[selected]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selected]:[&:not([data-hover])]:text-destructive-foreground",
                                        date.compare(now) === 0 &&
                                          "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-info data-[selected]:after:bg-info"
                                      )}
                                    />
                                  )}
                                </CalendarGridBody>
                              </CalendarGrid>
                            </Calendar>
                          </Dialog>
                        </Popover>
                      </DatePicker>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex gap-2 w-full">
            <FormField
              control={form.control}
              name="role"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className=" w-1/2">
                  <FormLabel>{dictionary.role}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className=" w-full">
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={UseTheme()}>
                      {userRoleContext.map((item) => {
                        const role = toLowerCase(item);
                        return (
                          <SelectItem
                            className=" capitalize"
                            key={role}
                            value={item}
                          >
                            {role}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{dictionary.gender.label}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-x-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MALE" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.gender.male}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="FEMALE" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.gender.female}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="OTHER" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.gender.other}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="info"
          className=" w-full"
        >
          {isPending ? <BeatLoader /> : <span>{dictionary.button}</span>}
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
