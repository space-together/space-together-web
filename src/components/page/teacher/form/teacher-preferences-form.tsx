"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import DailyAvailabilityInput from "@/components/common/form/daily-availability-input";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import type { Locale } from "@/i18n";
import { ProfessionalGoalDetails } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { redirectContents } from "@/lib/hooks/redirect";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  TeacherPreferencesSchema,
  type TeacherPreferences,
} from "@/lib/schema/teacher/teacher-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useRouter } from "next/navigation";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
  lang?: Locale;
  reset?: () => void;
}

const TeacherPreferencesForm = ({
  user,
  auth,
  setStep,
  lang,
  reset,
  markStepCompleted,
}: props) => {
  const { showToast } = useToast();
  const router = useRouter();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    TeacherPreferences,
    UserModel
  >({
    schema: TeacherPreferencesSchema,
    formOptions: {
      defaultValues: {
        professional_goals: user.professional_goals
          ? user.professional_goals
          : [],
        availability_schedule: user.availability_schedule
          ? user.availability_schedule
          : undefined,
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
    onSuccess: () => {
      showToast({
        title: "Thanks for upgrading your profile 🌻",
        description: "You have added teacher preferences.",
        type: "success",
      });
      reset?.();
      router.push(
        redirectContents({
          role: auth.user.role || "TEACHER",
          lang: lang || "en",
        }),
      );
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4 "
      >
        <div className=" flex flex-col gap-4">
          <CommonFormField
            control={form.control}
            name="professional_goals"
            label="Professional goals"
            fieldType="checkbox-input"
            items={ProfessionalGoalDetails}
            disabled={isPending}
            classname="w-full space-y-2"
          />
          <CommonFormField
            control={form.control}
            name="availability_schedule"
            label="Availability"
            fieldType="custom"
            disabled={isPending}
            classname="w-full"
            render={({ field, disabled }) => (
              <DailyAvailabilityInput
                value={
                  field.value as TeacherPreferences["availability_schedule"]
                }
                onChange={field.onChange}
                disabled={disabled}
              />
            )}
          />
        </div>

        <div className=" mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        {setStep && markStepCompleted ? (
          <CardFooter className=" flex justify-between">
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              className=" w-fit"
              library="daisy"
              onClick={() => {
                setStep(3, user._id);
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
                  reset?.();
                  router.push(
                    redirectContents({
                      role: auth.user.role || "TEACHER",
                      lang: lang || "en",
                    }),
                  );
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
          </CardFooter>
        ) : (
          <Button
            disabled={isPending}
            type="submit"
            variant="info"
            className=" w-full"
            library="daisy"
            role={isPending ? "loading" : undefined}
          >
            Add Preferences
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TeacherPreferencesForm;
