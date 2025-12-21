"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type JoinSchoolDto,
  JoinSchoolSchema,
} from "@/lib/schema/school/join-school-schema";
import { authContext, setAuthCookies } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function InputJoinSchoolFormForm() {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<JoinSchoolDto>({
    resolver: zodResolver(JoinSchoolSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: JoinSchoolDto) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const auth = await authContext();
      if (!auth) return;

      const req = await apiRequest<JoinSchoolDto, { school_token: string }>(
        "post",
        "/join-school-requests/join-by-code",
        data,
        {
          token: auth.token,
        },
      );
      if (req.data) {
        setAuthCookies(auth.token, auth.user.id, req.data.school_token);
        setSuccess(`To join school successfully! ☺️`);
      } else {
        setError(req.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormField
          control={form.control}
          fieldType="otp-input"
          name="code"
          label="School code"
          otpInputProps={{ maxLength: 5 }}
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
