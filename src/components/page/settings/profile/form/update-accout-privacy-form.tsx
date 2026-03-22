"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import {
  updateUserEmailDto,
  updateUserEmailSchema,
} from "@/lib/schema/user/user-email.dto";

const UpdateAccountPrivacyForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending] = useTransition();
  const form = useForm<updateUserEmailDto>({
    resolver: zodResolver(updateUserEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = (values: updateUserEmailDto) => {
    setError("");
    setSuccess("");

    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center space-x-4"
      >
        <div className="flex flex-col space-y-2">
          <CommonFormField
            name="email"
            control={form.control}
            label="Change account in private"
            fieldType="checkbox"
            disabled={isPending}
            description="make account private on you and school staff can access you information."
          />
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateAccountPrivacyForm;
