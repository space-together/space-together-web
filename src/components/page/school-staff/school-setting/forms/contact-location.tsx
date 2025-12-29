"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import AddSocialMedia, {
  detectSocialMediaPlatform,
} from "@/components/common/form/add-social-media";
import { CommonFormField } from "@/components/common/form/common-form-field";
import MyImage from "@/components/common/myImage";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { DefaultPlatform } from "@/lib/const/social-media-const";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

import { PlusCircle } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import {
  type ContactLocationDto,
  ContactLocationSchema,
} from "./schema/contact-location";

interface Props {
  auth: AuthContext;
  initialData?: School;
}

export const ContactLocationForm = ({ auth, initialData }: Props) => {
  // -------------------------------------
  // Form logic (same pattern everywhere)
  // -------------------------------------
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ContactLocationDto,
    School
  >({
    schema: ContactLocationSchema,

    formOptions: {
      defaultValues: {
        address: initialData?.address ?? {
          street: "",
          city: "",
          state: "",
          postal_code: "",
          country: "Rwanda",
          google_map_url: "",
        },
        contact: initialData?.contact ?? {
          phone: "",
          email: "",
          whatsapp: "",
        },
        website: initialData?.website ?? "",
        social_media:
          initialData?.social_media?.map((sm) => ({
            platform: sm.platform || detectSocialMediaPlatform(sm.url ?? ""),
            url: sm.url ?? "",
          })) ?? [],
      },
    },

    request: {
      method: "put",
      url: `/school/${initialData?.id || initialData?._id}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: "School contact & location updated successfully",

    toastOnError: true,
  });

  // -------------------------------------
  // Social media field array
  // -------------------------------------
  const { fields, append, remove } = useFieldArray({
    name: "social_media",
    control: form.control,
  });

  // -------------------------------------
  // Render
  // -------------------------------------
  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h3 className="text-2xl font-semibold">
            Update School Contact & Location
          </h3>

          {/* Address */}
          <CommonFormField
            control={form.control}
            name="address"
            label="Address Details"
            fieldType="address"
            disabled={isPending}
          />

          {/* Contact info */}
          <fieldset className="space-y-4 rounded-lg p-4">
            <legend className="text-lg font-medium">Contact Information</legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <CommonFormField
                control={form.control}
                name="contact.phone"
                label="Phone Number"
                fieldType="phone"
                disabled={isPending}
              />

              <CommonFormField
                control={form.control}
                name="contact.email"
                label="Email Address"
                type="email"
                placeholder="info@school.org"
                disabled={isPending}
              />

              <CommonFormField
                control={form.control}
                name="contact.whatsapp"
                label={
                  <span className="flex items-center gap-2">
                    <MyImage src="/icons/whatsapp.png" role="ICON" />
                    WhatsApp Number
                  </span>
                }
                placeholder="+250 792 000 000"
                disabled={isPending}
              />
            </div>
          </fieldset>

          {/* Website */}
          <CommonFormField
            control={form.control}
            name="website"
            label="Website"
            type="url"
            placeholder="https://www.schoolwebsite.com"
            disabled={isPending}
          />

          {/* Social media */}
          <fieldset className="space-y-4 rounded-lg p-4">
            <legend className="text-lg font-medium">
              Social Media <span className="text-xs">(Optional)</span>
            </legend>

            <div className="space-y-4">
              {fields.map((item, index) => (
                <AddSocialMedia<ContactLocationDto>
                  key={item.id ?? index}
                  index={index}
                  control={form.control}
                  remove={remove}
                  setValue={form.setValue}
                  getValues={form.getValues}
                  watch={form.watch}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  platform: DefaultPlatform,
                  url: "",
                })
              }
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Social Media
            </Button>
          </fieldset>

          {/* Messages */}
          <FormError message={error} />
          <FormSuccess message={success} />

          {/* Footer */}
          <Button
            type="submit"
            variant="info"
            library="daisy"
            disabled={
              isPending ||
              (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
            }
            role={isPending ? "loading" : undefined}
            className="min-w-[140px]"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </Card>
  );
};
