"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  type UpdateUser,
  UpdateUserSchema,
} from "@/lib/schema/user/update-user-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";

interface Props {
  currentUser: UserModel;
}

const UserUserDataForm = ({ currentUser }: Props) => {
  // -------------------------------------
  // Form logic (standardized)
  // -------------------------------------
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    UpdateUser,
    UserModel
  >({
    schema: UpdateUserSchema,

    formOptions: {
      defaultValues: {
        name: currentUser.name ?? "",
        username: currentUser.username ?? "",
        bio: currentUser.bio ?? "",
        phone: currentUser.phone ?? "",
        image: currentUser.image ?? "",
        age: undefined,
      },
    },

    request: {
      method: "put",
      url: `/users/${currentUser.id || currentUser._id}`,
    },

    onSuccessMessage: "Profile updated successfully",

    toastOnError: true,
  });

  // -------------------------------------
  // Image upload (custom field)
  // -------------------------------------
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        form.setError("image", {
          message: "Please select a valid image file",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        form.setError("image", {
          message: "Image size must be under 10MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        form.setValue("image", reader.result as string, {
          shouldDirty: true,
        });
      };
      reader.readAsDataURL(file);
    },
    [form],
  );

  const { getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  // -------------------------------------
  // Render
  // -------------------------------------
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          {/* Left column */}
          <div className="w-1/2 space-y-4">
            <CommonFormField
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="User full name"
              disabled={isPending}
              description="Your legal full name"
              required
            />

            <CommonFormField
              control={form.control}
              name="username"
              label="Username"
              placeholder="Unique username"
              disabled={isPending}
              description="Your public username (like Instagram)"
              required
            />

            <CommonFormField
              control={form.control}
              name="age"
              label="Date of Birth / Age"
              fieldType="age"
              disabled={isPending}
              description="Used for eligibility checks"
            />

            <CommonFormField
              control={form.control}
              name="phone"
              label="Phone Number"
              fieldType="phone"
              disabled={isPending}
              description="Used to communicate with you"
            />

            <CommonFormField
              control={form.control}
              name="bio"
              label="Bio"
              fieldType="textarea"
              placeholder="Tell us about yourself..."
              disabled={isPending}
              description="Your interests, hobbies, or background"
            />
          </div>

          {/* Right column – Image */}
          <div className="w-1/2 flex flex-col items-center gap-4 pt-6">
            <CommonFormField
              control={form.control}
              name="image"
              label="Profile Image"
              fieldType="avatar"
            />
          </div>
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
        <Button
          type="submit"
          library="daisy"
          variant="info"
          disabled={isPending}
          role={isPending ? "loading" : undefined}
          className="w-40"
        >
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default UserUserDataForm;
