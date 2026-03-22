"use client";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  type StudentBackground,
  StudentBackgroundSchema,
} from "@/lib/schema/student/student-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const StudentBackgroundForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const { showToast } = useToast();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    StudentBackground,
    UserModel
  >({
    schema: StudentBackgroundSchema,
    formOptions: {
      defaultValues: {
        address: user.address ? user.address : undefined,
        age: user.age ? user.age : undefined,
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
        description:
          "You have added student personal details and background info.",
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
        <CommonFormField
          control={form.control}
          name="age"
          label="Date of Birth / Age"
          fieldType="age"
          disabled={isPending}
          classname="w-full space-y-2"
        />
        <CommonFormField
          control={form.control}
          name="address"
          label="Your Address"
          fieldType="address"
          disabled={isPending}
          classname="w-full"
        />

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
                Add Background
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

export default StudentBackgroundForm;
