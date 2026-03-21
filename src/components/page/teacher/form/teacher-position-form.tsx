"use client";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import CheckboxInput from "@/components/common/form/checkbox-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  EmploymentTypeDetails,
  SubjectCategoryDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import {
  type TeacherPosition,
  TeacherPositionSchema,
} from "@/lib/schema/teacher/teacher-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const TeacherPositionForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const { showToast } = useToast();
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    TeacherPosition,
    UserModel
  >({
    schema: TeacherPositionSchema,
    formOptions: {
      defaultValues: {
        favorite_subjects_category: user.favorite_subjects_category
          ? user.favorite_subjects_category
          : [],
        employment_type: user.employment_type ? user.employment_type : undefined,
        teaching_level: user.teaching_level ? user.teaching_level : [],
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
        description: "You have added position information.",
        type: "success",
      });
      if (setStep) setStep(2, data.id);
      if (markStepCompleted)
        markStepCompleted(1, true, data.id || data._id);
    },
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [tradesRes] = await Promise.all([
          apiRequest<unknown, TradeModule[]>("get", "/trades", undefined, {
            token: auth.token,
          }),
        ]);

        if (tradesRes.data) {
          const activeTrades = tradesRes.data.filter((t) => !t.disable);
          setTrades(activeTrades);
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth.token]);

  const tradeItems =
    trades.length > 0
      ? Object.fromEntries(
          trades.map((t) => [
            t.id || t._id,
            {
              name: t.name,
              description: t.description ?? undefined,
              image: undefined,
            },
          ]),
        )
      : undefined;

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
            name="employment_type"
            label="Employment type"
            fieldType="radio-input"
            items={EmploymentTypeDetails}
            disabled={isPending}
            classname="w-full space-y-2"
          />
          <CommonFormField
            control={form.control}
            name="teaching_level"
            label="Teaching Level"
            fieldType="custom"
            disabled={isPending || loadingOptions}
            classname="w-full space-y-2"
            render={({ field, disabled }) =>
              loadingOptions ? (
                <div className=" skeleton h-12 w-full" />
              ) : tradeItems ? (
                <CheckboxInput
                  showTooltip
                  items={tradeItems}
                  values={field.value}
                  onChange={field.onChange}
                  classname=" grid-cols-3 gap-2"
                  disabled={disabled}
                />
              ) : (
                <div className="text-muted-foreground text-sm">
                  No trades available
                </div>
              )
            }
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
            Add Position information
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TeacherPositionForm;
