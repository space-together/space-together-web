"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  LanguageDetails,
  StudyStyleDetails,
  SubjectCategoryDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  type StudentAcademicInterest,
  StudentAcademicInterestSchema,
} from "@/lib/schema/student/student-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const StudentAcademicInterestForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const { showToast } = useToast();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    StudentAcademicInterest,
    UserModel
  >({
    schema: StudentAcademicInterestSchema,
    formOptions: {
      defaultValues: {
        favorite_subjects_category: user.favorite_subjects_category
          ? user.favorite_subjects_category
          : [],
        preferred_study_styles: user.preferred_study_styles
          ? user.preferred_study_styles
          : [],
        languages_spoken: user.languages_spoken ? user.languages_spoken : [],
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
        description: "You have added student academic interest info.",
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
            name="favorite_subjects_category"
            label="Favorite subjects category"
            fieldType="checkbox-input"
            items={SubjectCategoryDetails}
            disabled={isPending}
            classname="w-full space-y-2"
          />
          <CommonFormField
            control={form.control}
            name="preferred_study_styles"
            label="Preferred study style"
            fieldType="checkbox-input"
            items={StudyStyleDetails}
            disabled={isPending}
            classname="w-full space-y-2"
          />
          <CommonFormField
            control={form.control}
            name="languages_spoken"
            label="Languages you speak"
            fieldType="checkbox-input"
            items={LanguageDetails}
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
                Add academic interests
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
            Add academic interests
          </Button>
        )}
      </form>
    </Form>
  );
};

export default StudentAcademicInterestForm;
