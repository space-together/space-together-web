"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError } from "@/components/common/form-message";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { schoolLogoImage } from "@/lib/context/images";
import {
  type SchoolIdentityDto,
  SchoolIdentitySchema,
} from "./schema/update-school-data-schema";

interface SchoolIdentityFormProps {
  initialData?: Partial<SchoolIdentityDto>;
  onNext: (data: SchoolIdentityDto) => void;
  isParentPending?: boolean;
}

export function SchoolIdentityForm({
  initialData,
  onNext,
  isParentPending = false,
}: SchoolIdentityFormProps) {
  const [error, setError] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SchoolIdentityDto>({
    resolver: zodResolver(SchoolIdentitySchema),
    defaultValues: {
      name: initialData?.name ?? undefined,
      username: initialData?.username ?? undefined,
      logo: initialData?.logo ?? undefined,
      description: initialData?.description ?? undefined,
    },
  });

  const handleLogoChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    setError("");
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) {
        return setError("Please select an image file for the logo.");
      }
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return setError("Logo image size should be less than 2MB.");
      }
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: SchoolIdentityDto) => {
    setError("");
    console.log("School Identity Data:", values);
    startTransition(() => {
      onNext(values);
    });
  };

  const combinedPending = isPending || isParentPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="basic-card space-y-6 p-6 shadow-sm md:p-8"
      >
        <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
          Basic Information
        </h3>

        <CommonFormField
          control={form.control}
          name="name"
          label="School Name"
          placeholder="e.g., Green Hills Academy"
          disabled={combinedPending}
        />

        <CommonFormField
          control={form.control}
          name="username"
          label="School Username"
          placeholder="e.g., greenhills"
          disabled={combinedPending}
          description="Unique identifier (usually cannot be changed)."
        />

        <CommonFormField
          control={form.control}
          name="logo"
          label="School Logo"
          fieldType="custom"
          disabled={combinedPending}
          description="Max 2MB. Recommended: square aspect ratio."
          render={({ field, disabled }) => (
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="logo-identity-upload"
                  className="cursor-pointer"
                >
                  <MyImage
                    src={field.value || schoolLogoImage}
                    className="size-24 rounded border"
                    classname="object-contain"
                    alt="School Logo Preview"
                  />
                </Label>
                <Input
                  id="logo-identity-upload"
                  disabled={disabled}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onClick={(e) => (e.currentTarget.value = "")}
                  onChange={(e) => handleLogoChange(e, field.onChange)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("logo-identity-upload")?.click()
                  }
                  disabled={disabled}
                >
                  {field.value ? "Change Logo" : "Upload Logo"}
                </Button>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => field.onChange(undefined)}
                    disabled={disabled}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                )}
              </div>
              {error && <FormError message={error} />}
            </div>
          )}
        />

        <CommonFormField
          control={form.control}
          name="description"
          label="Description"
          fieldType="textarea"
          placeholder="Tell us a little bit about the school"
          className="min-h-[100px] resize-y"
          disabled={combinedPending}
        />

        {error && <FormError message={error} />}

        <div className="flex justify-end">
          <Button type="submit" disabled={combinedPending}>
            {isPending ? "Saving..." : "Next: Classification"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
