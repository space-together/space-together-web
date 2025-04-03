"use client";

import {
  onboardingSchema,
  onboardingSchemaTypes,
} from "@/utils/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ChangeEvent, useState, useTransition } from "react";
import UseTheme from "@/context/theme/use-theme";
import { FormMessageError, FormMessageSuccess } from "./form-message";
import { Button } from "@/components/ui/button";
import MyImage from "@/components/my-components/myImage";
import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";
import { Locale } from "@/i18n";
import { updateUserByUserSession } from "@/services/data/api-fetch-data";
import { authUser } from "@/types/userModel";
import { CountriesContext } from "@/context/data/country";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AskIfUserHaveSchoolOrClass from "../dialog/ask-if-user-have-school-class";
import { UserRole } from "../../../../prisma/prisma/generated";
interface Props {
  dictionary: authOnboardingFormDiction;
  user: authUser;
  lang: Locale;
}

const OnboardingForm = ({ dictionary, user, lang }: Props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const [userRole , setUserRole] = useState<UserRole | null>(null);

  const form = useForm<onboardingSchemaTypes>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      image: user?.image ?? "",
      age: undefined,
      phone: "",
      gender: undefined,
      role: undefined,
      location: {
        country: "Rwanda",
        province: "",
        district: "",
      },
      bio: "",
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

  const onSubmit = (value: onboardingSchemaTypes) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await updateUserByUserSession(value, user?.id, user.token);

      if (update.success && update.data) {
        setSuccess(update.success);
         setUserRole(update.data.role);
      } else if (update.error) {
        setTimeout(() => setError(update.error), 0);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-2"
      >
        {/* image */}
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
                  className={cn("size-24")}
                  classname=" card"
                  alt="Profile"
                />
                <span
                  className={cn("cursor-pointer", !field.value && "text-info")}
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
        <div className="flex space-x-2 w-full justify-between">
          {/* Left */}
          <div className=" flex flex-col space-y-2 w-full justify-start">
            {/* age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>{dictionary.age.label}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {/* Year Select */}
                      <div className=" flex flex-col space-y-1 w-full">
                        <Label>{dictionary.age.year}</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              year: Number(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent
                            className=" max-h-60"
                            data-theme={UseTheme()}
                          >
                            {Array.from(
                              { length: 100 },
                              (_, i) => new Date().getFullYear() - i
                            ).map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Month Select */}
                      <div className=" flex flex-col space-y-1 w-full">
                        <Label>{dictionary.age.month}</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              month: Number(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent
                            className=" max-h-60"
                            data-theme={UseTheme()}
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (month) => (
                                <SelectItem key={month} value={String(month)}>
                                  {month}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Day Select */}
                      <div className=" flex flex-col space-y-1 w-full">
                        <Label>{dictionary.age.day}</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              day: Number(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent
                            className=" max-h-60"
                            data-theme={UseTheme()}
                          >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              (day) => (
                                <SelectItem key={day} value={String(day)}>
                                  {day}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.phone}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{dictionary.role.label}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-x-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="STUDENT" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.role.student}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="TEACHER" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.role.teacher}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SCHOOLSTAFF" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.role.schoolStaff}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* gender */}
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
                          <RadioGroupItem value="Male" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.gender.male}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Female" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dictionary.gender.female}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Other" />
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
          <div className=" justify-start flex flex-col space-y-2 w-full">
            {/* location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>{dictionary.location.label}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className=" flex flex-col space-y-1 w-full">
                        <Label>{dictionary.location.province}</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              country: "Rwanda",
                              province: value,
                              district: "",
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Province" />
                          </SelectTrigger>
                          <SelectContent data-theme={UseTheme()}>
                            {CountriesContext[0].provinces.map((province) => (
                              <SelectItem
                                key={province.name}
                                value={province.name}
                              >
                                {province.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* District Select */}
                      <div className="  flex flex-col  space-y-1 w-full">
                        <Label> {dictionary.location.district}</Label>
                        <Select
                          disabled={!field.value?.province}
                          onValueChange={(value) =>
                            field.onChange({ ...field.value, district: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="District" />
                          </SelectTrigger>
                          <SelectContent data-theme={UseTheme()}>
                            {CountriesContext[0].provinces
                              .find((p) => p.name === field.value?.province)
                              ?.districts.map((district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* bio */}
            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.bio}</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
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
          {dictionary.button} {isPending && <BeatLoader />}
        </Button>
        {(success && userRole) && <AskIfUserHaveSchoolOrClass isOpen={true} lang={lang} userRole={userRole}/>}
      </form>
    </Form>
  );
};

export default OnboardingForm;
