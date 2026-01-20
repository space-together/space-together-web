"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormError } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { schoolMembers, schoolTypes } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import {
  type BasicInformationDto,
  BasicInformationSchema,
} from "./schema/basic-information";

interface BasicInformationFormProps {
  initialData: School;
  auth: AuthContext;
}

export const BasicInformationForm = ({
  initialData,
  auth,
}: BasicInformationFormProps) => {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const { showToast } = useToast();

  const form = useForm<BasicInformationDto>({
    resolver: zodResolver(BasicInformationSchema),
    defaultValues: {
      logo: initialData?.logo || undefined,
      name: initialData?.name || undefined,
      username: initialData?.username || undefined,
      description: initialData?.description || undefined,
      school_type: initialData?.school_type || undefined,
      school_members: initialData?.school_members || undefined,
    },
  });

  const handleSubmit = (values: BasicInformationDto) => {
    setError(null);
    startTransition(async () => {
      const res = await apiRequest<BasicInformationDto, School>(
        "put",
        `/schools/${initialData._id}`,
        values,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );
      if (res.data) {
        showToast({
          type: "success",
          title: "To update school basic information success!",
          description: "You have been update school basic information",
          duration: 3000,
        });
      } else {
        showToast({
          type: "error",
          title: "Some thing went wrong to update school information",
          description: res.message,
          duration: 4000,
        });
      }
    });
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <h3 className="mb-4 pb-2 text-xl font-semibold">Basic Information</h3>
          <div className="flex w-full space-x-6">
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-120"
                        placeholder="e.g., Green Hills Academy"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Full legal or commonly used name of your school.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Username</FormLabel>
                    <FormControl>
                      <Input
                        className="w-120"
                        placeholder="e.g., greenhills"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Unique identifier for the school. Used in URLs or login;
                      usually cannot be changed later.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="school_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select school type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent data-theme={theme}>
                        {schoolTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Defines the educational level or specialization of your
                      institution (e.g., Primary, Secondary, Vocational).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="school_members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Body</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select student body type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent data-theme={theme}>
                        {schoolMembers.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Gender composition of students your school enrolls (e.g.,
                      Co-educational, Boys only, Girls only).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about the school"
                        className="min-h-[100px] w-120 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide an overview including history, values, mission, or
                      key achievements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CommonFormField
              control={form.control}
              name="logo"
              label="School Logo"
              placeholder="Upload school logo"
              required
              disabled={isPending}
              fieldType="avatar"
              avatarProps={{
                avatarProps: { classname: "object-contain", size: "3xl" },
              }}
              description="Upload a school logo"
            />
          </div>
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full md:w-auto"
            library={"daisy"}
            variant={"info"}
            disabled={
              isPending ||
              (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
            }
          >
            {isPending ? "Saving..." : "Save Basic Information"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
