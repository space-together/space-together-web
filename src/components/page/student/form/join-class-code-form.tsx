"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { getAccessToken } from "@/lib/utils/client-auth";
import { type JoinClassDto, JoinClassSchema } from "./schema/join-class-schema";

export default function JoinClassCodeForm() {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    JoinClassDto,
    unknown
  >({
    schema: JoinClassSchema,
    formOptions: {
      defaultValues: {
        username: "",
        code: "",
      },
    },
    request: {
      method: "post",
      url: "/classes/join-by-code",
      apiRequest: {
        token: getAccessToken() ?? "",
      },
    },
    onSuccessMessage: "Joined class successfully",
    toastOnError: true,
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormField
          control={form.control}
          fieldType="input"
          name="username"
          label="Class username"
          placeholder="class_username"
          disabled={isPending}
        />

        <CommonFormField
          control={form.control}
          fieldType="otp-input"
          name="code"
          label="Class code"
          otpInputProps={{ maxLength: 6 }}
          disabled={isPending}
        />
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          className="w-full"
          variant={"info"}
          library="daisy"
          type="submit"
          role={isPending ? "loading" : undefined}
        >
          Join Class
        </Button>
      </form>
    </Form>
  );
}
