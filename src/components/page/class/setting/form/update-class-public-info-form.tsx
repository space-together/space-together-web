"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { type Class, ClassSchema } from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
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
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    UpdateClassPublicInfo,
    Class
  >({
    schema: UpdateClassPublicInfoSchema,
    formOptions: {
      defaultValues: {
        name: cls.name,
        description: cls.description,
        capacity: cls.capacity,
        image: cls.image,
      },
    },
    request: {
      method: "put",
      url: `/school/classes/${cls._id}`,
      auth: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: "Class public info updated successfully",
    toastOnError: true,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
