"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { JoinSchoolDto } from "@/lib/schema/school/join-school-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { type JoinClassDto, JoinClassSchema } from "./schema/join-class-schema";

export default function JoinClassCodeForm() {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<JoinClassDto>({
    resolver: zodResolver(JoinClassSchema),
    defaultValues: {
      username: "",
      code: "",
    },
  });

  function onSubmit(data: JoinSchoolDto) {
    setError(null);
    setSuccess(null);
    // startTransition(async () => {
    //   const join = await JoinSchoolByUsernameAndCode(data);
    //   if (join.data) {
    //     setSuccess(`To join school successfully! ☺️`);
    //   } else {
    //     setError(join.message);
    //   }
    // });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormField
          control={form.control}
          fieldType="input"
          name="username"
          label="Class username"
          placeholder="class_username"
        />

        <CommonFormField
          control={form.control}
          fieldType="otp-input"
          name="code"
          label="Class code"
          otpInputProps={{ maxLength: 6 }}
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
        >
          Join Class
        </Button>
      </form>
    </Form>
  );
}
