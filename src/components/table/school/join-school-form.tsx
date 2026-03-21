"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type JoinSchoolDto,
  JoinSchoolSchema,
} from "@/lib/schema/school/join-school-schema";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { setAuthCookies } from "@/lib/utils/auth-context";
import {
  getAccessToken,
  getCurrentUserId,
} from "@/lib/utils/client-auth";

export default function InputJoinSchoolFormForm() {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    JoinSchoolDto,
    { school_token: string }
  >({
    schema: JoinSchoolSchema,
    formOptions: {
      defaultValues: {
        code: "",
      },
    },
    request: {
      method: "post",
      url: "/join-school-requests/join-by-code",
      apiRequest: {
        token: getAccessToken() ?? "",
      },
    },
    onSuccessMessage: "Joined school successfully",
    toastOnError: true,
    onSuccess: (data) => {
      const t = getAccessToken();
      const uid = getCurrentUserId();
      if (t && uid) setAuthCookies(t, uid, data.school_token);
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormField
          control={form.control}
          fieldType="otp-input"
          name="code"
          label="School code"
          otpInputProps={{ maxLength: 5 }}
          disabled={isPending}
        />

        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          role={isPending ? "loading" : undefined}
          className="w-full"
          variant={"info"}
          library="daisy"
          type="submit"
        >
          Join school
        </Button>
      </form>
    </Form>
  );
}
