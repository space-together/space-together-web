"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { Locale } from "@/i18n";
import {
  GenderDetails,
  UserRoleDetails,
} from "@/lib/const/common-details-const";
import { redirectContents } from "@/lib/hooks/redirect";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthUserDto } from "@/lib/schema/user/auth-user-schema";
import { UserOnboardingSchema } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { setAuthCookies } from "@/lib/utils/auth-context";
import { useRouter } from "next/navigation";
import type { z } from "zod";

interface Props {
  lang: Locale;
  auth: AuthContext;
  dictionary: any;
}

const onboardingUpdateSchema = UserOnboardingSchema.partial();
type OnboardingUpdate = z.infer<typeof onboardingUpdateSchema>;

const OnboardingForm = ({ lang, auth, dictionary }: Props) => {
  const router = useRouter();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    OnboardingUpdate,
    AuthUserDto
  >({
    schema: onboardingUpdateSchema,
    formOptions: {
      defaultValues: {
        image: auth.user.image ?? undefined,
        username: auth.user.username ?? "",
        role: auth.user.role ?? undefined,
        phone: auth.user.phone ?? "",
        gender: auth.user.gender ?? undefined,
      },
    },
    request: {
      method: "patch",
      url: "/auth/onboarding",
      apiRequest: {
        token: auth.token,
      },
    },
    toastOnError: true,
    onSuccessMessage: "Your basic info profile updated ☺️",
    onSuccess: async (res) => {
      if (res.accessToken) {
        await setAuthCookies(res.accessToken, res.id, res.schoolAccessToken);
      }

      if (res.role === "STUDENT") {
        router.push(`/${lang}/auth/onboarding/student`);
      } else if (res.role === "TEACHER") {
        router.push(`/${lang}/auth/onboarding/teacher`);
      } else if (res.role === "SCHOOLSTAFF") {
        router.push(`/${lang}/auth/onboarding/staff`);
      } else {
        router.push(redirectContents({ lang, role: res.role }));
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <CommonFormField
          label="Your profile picture"
          control={form.control}
          name="image"
          fieldType="avatar"
          disabled={isPending}
          avatarProps={{ avatarProps: { size: "2xl", alt: auth.user.name } }}
        />

        <div className="grid grid-cols-2 gap-4">
          <CommonFormField
            label={dictionary.phone}
            control={form.control}
            name="phone"
            fieldType="phone"
            disabled={isPending}
          />

          <CommonFormField
            label={dictionary.username}
            control={form.control}
            name="username"
            fieldType="input"
            disabled={isPending}
          />

          <CommonFormField
            control={form.control}
            name="gender"
            label="Gender"
            fieldType="radio-input"
            items={GenderDetails}
            disabled={isPending}
            className="grid-cols-2"
          />

          <CommonFormField
            control={form.control}
            name="role"
            label="Who are you"
            fieldType="radio-input"
            items={Object.fromEntries(
              Object.entries(UserRoleDetails).filter(
                ([key]) => key !== "ADMIN",
              ),
            )}
            disabled={isPending}
            className="grid-cols-2"
          />
        </div>

        {(error || success) && (
          <div className="mt-2">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        )}

        <Button
          type="submit"
          disabled={
            isPending ||
            (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
          }
          variant="info"
          className="w-full"
          library="daisy"
          role={isPending ? "loading" : undefined}
        >
          {dictionary.button}
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
