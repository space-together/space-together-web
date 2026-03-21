"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import AddressInput from "@/components/common/form/address-input";
import CheckboxInput from "@/components/common/form/checkbox-input";
import { CommonFormField } from "@/components/common/form/common-form-field";
import RadioInput from "@/components/common/form/radio-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CertificationDetails,
  EducationLevelDetails,
  LanguageDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  StaffBackgroundSchema,
  type StaffBackground,
} from "@/lib/schema/school-staff/school-staff-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const StaffBackgroundForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const { showToast } = useToast();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    StaffBackground,
    UserModel
  >({
    schema: StaffBackgroundSchema,
    formOptions: {
      defaultValues: {
        years_of_experience: user.years_of_experience
          ? user.years_of_experience
          : undefined,
        address: user.address ? user.address : undefined,
        education_level: user.education_level ? user.education_level : undefined,
        certifications_trainings: user.certifications_trainings
          ? user.certifications_trainings
          : undefined,
        languages_spoken: user.languages_spoken
          ? user.languages_spoken
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
    onSuccess: (data) => {
      showToast({
        title: "Thanks for upgrading your profile 🌻",
        description: "You have added background info.",
        type: "success",
      });
      if (setStep) setStep(3, data.id);
      if (markStepCompleted)
        markStepCompleted(2, true, data.id || data._id);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4 "
      >
        <div className=" flex flex-col space-y-4">
          <CommonFormField
            name="years_of_experience"
            control={form.control}
            label="Years of experience"
            fieldType="date"
            classname="lg:w-1/2 w-full"
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Your Address</FormLabel>
                <FormControl>
                  <AddressInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="languages_spoken"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Languages you speak</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={LanguageDetails}
                    values={field.value}
                    onChange={field.onChange}
                    classname=" grid-cols-3 gap-2"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="education_level"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Education level</FormLabel>
                <FormControl>
                  <RadioInput
                    showTooltip
                    items={EducationLevelDetails}
                    value={field.value}
                    onChange={field.onChange}
                    classname=" grid-cols-3 gap-2"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="certifications_trainings"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Certifications trainings</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={CertificationDetails}
                    values={field.value}
                    onChange={field.onChange}
                    classname=" grid-cols-3 gap-2"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                setStep(1, user._id);
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
                  setStep(3, user._id);
                  markStepCompleted(2, true, user._id);
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
            Add Background
          </Button>
        )}
      </form>
    </Form>
  );
};

export default StaffBackgroundForm;
