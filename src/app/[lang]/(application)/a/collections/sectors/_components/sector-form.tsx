"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  sectorBaseSchema,
  type SectorBase,
  type SectorModel,
} from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  sector?: SectorModel; // if provided → update mode
}

const SectorForm = ({ auth, sector }: Props) => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    SectorBase,
    SectorModel
  >({
    schema: sectorBaseSchema,

    formOptions: {
      defaultValues: {
        name: sector?.name ?? "",
        username: sector?.username ?? "",
        description: sector?.description ?? "",
        logo: sector?.logo ?? "",
        country: sector?.country ?? "",
        type: sector?.type ?? undefined,
        curriculum: sector?.curriculum ?? undefined,
        disable: sector?.disable ?? false,
      },
    },

    request: {
      method: sector ? "put" : "post",
      url: `/sectors${sector ? `/${sector._id}` : ""}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: sector
      ? "Sector updated successfully"
      : "Sector created successfully",

    toastOnError: true,

    onSuccess: () => {
      if (!sector) form.reset();
    },

    onError: (err, values) => {
      console.error("Sector form error:", err, values);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row gap-4">
          {/* LEFT */}
          <div className="flex w-1/2 flex-col space-y-4">
            <CommonFormField
              control={form.control}
              name="logo"
              label="Sector Logo"
              fieldType="image"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              fieldType="textarea"
              placeholder="Description..."
              className="min-h-24 resize-none"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="disable"
              label="Disable"
              fieldType="checkbox"
              disabled={isPending}
            />
          </div>

          {/* RIGHT */}
          <div className="flex w-1/2 flex-col space-y-4">
            <CommonFormField
              control={form.control}
              name="name"
              label="Sector Name"
              placeholder="e.g. Science"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="username"
              label="Username"
              placeholder="e.g. science"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="country"
              label="Country"
              placeholder="e.g. Rwanda"
              required
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="type"
              label="Sector Type"
              fieldType="select"
              placeholder="Select sector type"
              required
              disabled={isPending}
              selectOptions={[
                { label: "Global", value: "global" },
                { label: "International", value: "international" },
                { label: "Local", value: "local" },
              ]}
            />

            {/* Curriculum */}
            <div className="flex gap-2">
              <CommonFormField
                control={form.control}
                name="curriculum.0"
                label="Start Year"
                type="number"
                placeholder="2020"
                disabled={isPending}
              />

              <CommonFormField
                control={form.control}
                name="curriculum.1"
                label="End Year"
                type="number"
                placeholder="2025"
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button library="daisy" type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            library="daisy"
            type="submit"
            variant="primary"
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
          >
            {sector ? "Update Sector" : "Add Sector"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SectorForm;
