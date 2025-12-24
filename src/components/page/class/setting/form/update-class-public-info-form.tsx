"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { type Class, ClassSchema } from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const UpdateClassPublicInfoSchema = ClassSchema.pick({
  name: true,
  description: true,
  capacity: true,
  image: true,
}).partial();

export type UpdateClassPublicInfo = z.infer<typeof UpdateClassPublicInfoSchema>;

interface UpdateClassPublicInfoProps {
  cls: Class;
  auth: AuthContext;
}

const UpdateClassPublicInfo = ({ cls, auth }: UpdateClassPublicInfoProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateClassPublicInfo>({
    resolver: zodResolver(UpdateClassPublicInfoSchema),
    defaultValues: {
      name: cls?.name || "",
      description: cls?.description || "",
      capacity: cls?.capacity || 0,
      image: cls?.image || undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSubmit = (data: UpdateClassPublicInfo) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const res = await apiRequest<UpdateClassPublicInfo, Class>(
          "put",
          `/school/classes/${cls?._id}`,
          data,
          {
            token: auth?.token,
            schoolToken: auth?.schoolToken,
          },
        );

        if (res.data) {
          setSuccess("Class public info updated successfully");
          setTimeout(() => setSuccess(""), 3000);
        }

        if (!res.data) {
          setError(`Failed to update class public info: ${res.message}`);
          setTimeout(() => setError(""), 3000);
        }
      } catch (error) {
        setError(`Failed to update class public info: ${error}`);
        setTimeout(() => setError(""), 3000);
      }
    });

    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" flex flex-col gap-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className=" flex flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="name"
              label="Class Name"
              placeholder="Enter class name"
              type="input"
              required
              disabled={isPending}
              description="Class name may appear around School where you contribute or are mentioned. You can remove it at
              any time."
            />
            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              placeholder="class description..."
              required
              disabled={isPending}
              fieldType="textarea"
            />
            <CommonFormField
              control={form.control}
              name="capacity"
              label="Capacity"
              placeholder="class description..."
              required
              type="number"
              description="This is the maximum number of students that can be enrolled in the class."
              disabled={isPending}
              avatarProps={{ avatarProps: { alt: "Class username" } }}
            />
          </div>
          <div>
            <CommonFormField
              control={form.control}
              name="image"
              label="Image"
              placeholder="Upload class image"
              required
              disabled={isPending}
              fieldType="avatar"
              description="Upload a class image"
              avatarProps={{
                avatarProps: { alt: cls.name || "Class image", size: "3xl" },
              }}
            />
          </div>
        </div>
        <div className=" flex flex-col">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          library="daisy"
          type="submit"
          role={isPending ? "loading" : undefined}
          variant={"info"}
          disabled={
            isPending ||
            (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
          }
          className=" w-fit"
        >
          Update Class
        </Button>
      </form>
    </Form>
  );
};

export default UpdateClassPublicInfo;
