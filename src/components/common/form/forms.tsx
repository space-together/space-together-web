"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import AddSocialMedia, {
  detectSocialMediaPlatform,
} from "@/components/common/form/add-social-media";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import type { Locale } from "@/i18n";
import { CommunicationMethodDetails } from "@/lib/const/common-details-const";
import { DefaultPlatform } from "@/lib/const/social-media-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { redirectContents } from "@/lib/hooks/redirect";
import {
  type SocialAndCommunication,
  SocialAndCommunicationSchema,
} from "@/lib/schema/common-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useRouter } from "next/navigation";
import { useFieldArray } from "react-hook-form";

// ----------------------commutation---------------------------

interface propsSocialAndCommunication {
  initialData: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
  reset?: () => void;
  redirect?: boolean;
  lang?: Locale;
}

export const SocialAndCommunicationForm = ({
  initialData,
  auth,
  setStep,
  markStepCompleted,
  reset,
  redirect,
  lang,
}: propsSocialAndCommunication) => {
  const { showToast } = useToast();
  const router = useRouter();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    SocialAndCommunication,
    UserModel
  >({
    schema: SocialAndCommunicationSchema,
    formOptions: {
      defaultValues: {
        preferred_communication_method: initialData.preferred_communication_method
          ? initialData.preferred_communication_method
          : undefined,
        social_media:
          initialData?.social_media?.map((sm) => ({
            platform: sm.platform || detectSocialMediaPlatform(sm.url || ""),
            url: sm.url || "",
          })) ?? [],
      },
      mode: "onChange",
    },
    request: {
      method: "put",
      url: `/users/${auth.user.id}`,
      apiRequest: { token: auth.token },
    },
    onSuccessMessage: "Profile updated",
    toastOnError: true,
    onSuccess: (data) => {
      showToast({
        title: "Thanks for upgrading your profile 🌻",
        description: "You have added social and communication info.",
        type: "success",
      });
      reset?.();
      if (redirect)
        router.push(
          redirectContents({
            lang: lang || "en",
            role: auth.user.role || "STUDENT",
          }),
        );
      if (setStep) setStep(4, data.id);
      if (markStepCompleted)
        markStepCompleted(3, true, data.id || data._id);
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "social_media",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4 "
      >
        <CommonFormField<SocialAndCommunication>
          control={form.control}
          name="preferred_communication_method"
          label="Preferred communication method"
          fieldType="checkbox-input"
          items={CommunicationMethodDetails}
          disabled={isPending}
          classname="w-full space-y-2"
        />

        <fieldset className="space-y-4 rounded-lg p-4">
          <legend className="mb-1 px-1 text-lg font-medium">
            Social Media <span className="text-xs">(Optional)</span>
          </legend>
          <FormDescription className="text-sm">
            Add social media links. The platform will be auto-detected, or you
            can select it manually.
          </FormDescription>
          <div className="mt-3 space-y-4">
            {fields.map((item, index) => (
              <AddSocialMedia<SocialAndCommunication>
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
            variant="outline" // Standard shadcn variant
            onClick={
              () =>
                append({
                  platform: DefaultPlatform,
                  url: "",
                  // id: crypto.randomUUID(),
                }) // Ensure new item matches SocialMediaLink type
            }
            className="gap-2" // For spacing between icon and text
            role="create"
          >
            Add Social Media
          </Button>
        </fieldset>

        <div className=" mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        {setStep && markStepCompleted ? (
          <div className=" flex justify-between">
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              className=" w-fit"
              library="daisy"
              onClick={() => {
                setStep(2, initialData._id);
              }}
            >
              Go back
            </Button>
            <div className=" flex gap-4">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                className=" w-fit"
                library="daisy"
                onClick={() => {
                  if (reset) reset();
                  if (redirect)
                    return router.push(
                      redirectContents({
                        role: auth.user.role || "STUDENT",
                        lang: lang || "en",
                      }),
                    );
                  setStep(4, initialData._id);
                  markStepCompleted(3, true, initialData._id);
                }}
              >
                Skip
              </Button>

              <Button
                disabled={isPending}
                type="submit"
                variant="info"
                className="  w-fit"
                library="daisy"
                role={isPending ? "loading" : undefined}
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <Button
            disabled={isPending}
            type="submit"
            variant="info"
            className=" w-full"
            library="daisy"
            role={isPending ? "loading" : undefined}
          >
            Upgrade social and communication
          </Button>
        )}
      </form>
    </Form>
  );
};
