"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  updateUserPasswordDto,
  updateUserPasswordSchema,
} from "@/lib/schema/user/user-password.dto";
import { getAccessToken } from "@/lib/utils/client-auth";
import { LockKeyholeIcon, LockKeyholeOpen } from "lucide-react";

const UpdateUserPasswordForm = () => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    updateUserPasswordDto,
    unknown
  >({
    schema: updateUserPasswordSchema,
    formOptions: {
      defaultValues: {
        password: "",
        currentPassword: "",
      },
    },
    request: {
      method: "post",
      url: "/auth/change-password",
      apiRequest: {
        token: getAccessToken() ?? "",
      },
    },
    onSuccessMessage: "Password updated successfully",
    toastOnError: true,
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <div className="flex flex-col space-y-4">
          <CommonFormField
            name="currentPassword"
            control={form.control}
            label="Current password"
            fieldType="custom"
            classname="w-80"
            description="Your old password you was using to login"
            disabled={isPending}
            render={({ field, disabled }) => (
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Input
                    {...field}
                    disabled={disabled}
                    className="peer w-80 ps-9"
                    placeholder="Old password"
                    type="password"
                  />
                  <div className="/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <LockKeyholeOpen
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            )}
          />
          <CommonFormField
            name="password"
            control={form.control}
            label="New password"
            fieldType="custom"
            classname="w-80"
            description="Your new password you will be used to login"
            disabled={isPending}
            render={({ field, disabled }) => (
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Input
                    {...field}
                    disabled={disabled}
                    className="peer w-80 ps-9"
                    placeholder="new password"
                    type="password"
                  />
                  <div className="/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <LockKeyholeIcon
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            )}
          />
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </div>
        <Button
          disabled={isPending}
          role={isPending ? "loading" : undefined}
          library={"daisy"}
          variant="info"
          size="sm"
          className="w-40"
          type="submit"
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserPasswordForm;
