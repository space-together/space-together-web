"use client";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  DepartmentDetails,
  EmploymentTypeDetails,
  JobTitleDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  type StaffDepartment,
  StaffDepartmentSchema,
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

const StaffDepartmentForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const { showToast } = useToast();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    StaffDepartment,
    UserModel
  >({
    schema: StaffDepartmentSchema,
    formOptions: {
      defaultValues: {
        department: user.department ? user.department : undefined,
        employment_type: user.employment_type ? user.employment_type : undefined,
        job_title: user.job_title ? user.job_title : undefined,
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
        description: "You have added department information.",
        type: "success",
      });
      if (setStep) setStep(2, data.id);
      if (markStepCompleted)
        markStepCompleted(1, true, data.id || data._id);
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
            name="department"
            label="Department / Office"
            fieldType="radio-input"
            items={DepartmentDetails}
            disabled={isPending}
            classname="w-full space-y-2"
          />
          <CommonFormField
            control={form.control}
            name="employment_type"
            label="Employment type"
            fieldType="radio-input"
            items={EmploymentTypeDetails}
            disabled={isPending}
            classname="w-full space-y-2"
          />

          <CommonFormField
            control={form.control}
            name="job_title"
            label="Job title"
            fieldType="radio-input"
            items={JobTitleDetails}
            disabled={isPending}
            classname="w-full space-y-2"
          />
        </div>
        <div className=" mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        {setStep && markStepCompleted ? (
          <div className=" flex justify-end">
            <div className=" flex gap-4">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                className=" w-fit"
                library="daisy"
                onClick={() => {
                  setStep(2, user._id);
                  markStepCompleted(1, true, user._id);
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
            Add Department
          </Button>
        )}
      </form>
    </Form>
  );
};

export default StaffDepartmentForm;
