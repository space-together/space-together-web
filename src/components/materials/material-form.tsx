"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import {
    LearningMaterialBaseSchema,
    type LearningMaterial,
    type LearningMaterialBase,
} from "@/lib/schema/learning-material/learning-material-schema";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";

import { useRealtimeData } from "@/lib/providers/RealtimeProvider";

interface Props {
  auth: AuthContext;
  material?: LearningMaterial;
  subjectId?: string;
}

const MaterialForm = ({ auth, material, subjectId }: Props) => {
  const { addItem, updateItem } = useRealtimeData<LearningMaterial>("learning_material");

  const materialTypeOptions = [
    { value: "Lesson Note", label: "Lesson Note" },
    { value: "Resource", label: "Resource" },
    { value: "Video", label: "Video" },
    { value: "File", label: "File" },
  ];

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    LearningMaterialBase,
    LearningMaterial
  >({
    schema: LearningMaterialBaseSchema,
    formOptions: {
      defaultValues: {
        subject_id: subjectId || material?.subject_id || "",
        title: material?.title || "",
        description: material?.description || "",
        type: material?.type || "Lesson Note",
        file_url: material?.file_url || undefined,
        video_url: material?.video_url || undefined,
        is_published: material?.is_published ?? true,
      },
    },

    request: {
      method: material ? "put" : "post",
      url: material
        ? `/learning-materials/${material._id || material.id}`
        : "/learning-materials",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: material
      ? "Material updated successfully"
      : "Material created successfully",

    toastOnError: true,
    onSuccess: (data) => {
      if (material) {
        updateItem(data as LearningMaterial);
      } else {
        addItem(data as LearningMaterial);
        form.reset();
      }
    },
  });

  const selectedType = form.watch("type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          <CommonFormField
            control={form.control}
            name="title"
            label="Title"
            required
            placeholder="Material title"
            disabled={isPending}
          />

          <CommonFormField
            control={form.control}
            name="description"
            label="Description"
            fieldType="textarea"
            placeholder="Brief description"
            disabled={isPending}
          />

          <CommonFormField
            control={form.control}
            name="type"
            label="Type"
            required
            fieldType="searchSelect"
            selectOptions={materialTypeOptions}
            disabled={isPending}
          />

          {selectedType === "Video" && (
            <CommonFormField
              control={form.control}
              name="video_url"
              label="Video URL"
              placeholder="YouTube or Vimeo URL"
              disabled={isPending}
            />
          )}

          {selectedType !== "Video" && (
            <CommonFormField
              control={form.control}
              name="file_url"
              label="File"
              fieldType="image"
              disabled={isPending}
            />
          )}

          <CommonFormField
            control={form.control}
            name="is_published"
            label="Publish"
            fieldType="checkbox"
            disabled={isPending}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" library="daisy">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="info"
            library="daisy"
            disabled={isPending}
            role={isPending ? "loading" : undefined}
          >
            {material ? "Update Material" : "Upload Material"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MaterialForm;
