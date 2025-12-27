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
import { useToast } from "@/lib/context/toast/ToastContext";
import { redirectContents } from "@/lib/hooks/redirect";
import type { AuthUserDto } from "@/lib/schema/user/auth-user-schema";
import {
  type UserOnboarding,
  UserOnboardingSchema,
} from "@/lib/schema/user/user-schema";
import { type AuthContext, setAuthCookies } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
interface Props {
  lang: Locale;
  auth: AuthContext;
  dictionary: any;
}

const OnboardingForm = ({ lang, auth, dictionary }: Props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();
  const form = useForm<UserOnboarding>({
    resolver: zodResolver(UserOnboardingSchema),
    defaultValues: {
      image: auth.user.image ?? undefined,
      username: auth.user.username ?? "",
      role: auth.user.role ?? undefined,
      phone: auth.user.phone ?? "",
      gender: auth.user.gender ?? undefined,
    },
  });
  const onSubmit = (value: UserOnboarding) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<UserOnboarding, AuthUserDto>(
        "patch",
        "/auth/onboarding",
        value,
        { token: auth.token },
      );
      if (update.data) {
        if (update.data.accessToken) {
          await setAuthCookies(
            update.data.accessToken,
            update.data.id,
            update.data.schoolAccessToken,
          );
          setSuccess("Your basic info profile ☺️");
          showToast({
            title: "Your basic info profile ☺️",
            description: " Thanks to help us to know you better!",
            type: "success",
          });
          if (update.data.role) {
            if (update.data.role === "STUDENT") {
              router.push(`/${lang}/auth/onboarding/student`);
            } else if (update.data.role === "TEACHER") {
              router.push(`/${lang}/auth/onboarding/teacher`);
            } else if (update.data.role === "SCHOOLSTAFF") {
              router.push(`/${lang}/auth/onboarding/staff`);
            } else {
              router.push(redirectContents({ lang, role: update.data.role }));
            }
          }
        }
      } else if (update.message) {
        showToast({
          title: "Some thing went wrong 😥",
          description: update.message,
          type: "error",
        });
        setError(update.message);
      } else {
        setError(`${update.error}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4 "
      >
        <CommonFormField
          label="Your profile picture"
          control={form.control}
          name="image"
          fieldType="avatar"
          disabled={isPending}
          avatarProps={{ avatarProps: { size: "2xl", alt: auth.user.name } }}
        />

        <div className=" grid grid-cols-2 gap-4">
          {/* username and phone */}
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
            type="text"
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
        <div className=" mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="info"
          className=" w-full"
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
