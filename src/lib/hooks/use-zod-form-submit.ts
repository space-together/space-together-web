"use client";

import { useToast } from "@/lib/context/toast/ToastContext";
import { FORM } from "@/lib/env";
import apiRequest, { type ApiRequestOptions } from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm, type FieldValues, type UseFormProps } from "react-hook-form";
import type { ZodType } from "zod";

interface UseZodFormSubmitOptions<TForm extends FieldValues, TResult> {
  schema: ZodType<TForm, any, any>;
  formOptions: UseFormProps<TForm>;
  request: {
    method: "post" | "put" | "patch" | "delete";
    url: string;
    apiRequest?: ApiRequestOptions;
  };

  transform?: (values: TForm) => unknown;

  onSuccessMessage: string;
  onSuccess?: (data: TResult, values: TForm) => void | Promise<void>;
  onError?: (message: string, values: TForm) => void | Promise<void>;
  onFinally?: () => void;
  toastOnError?: boolean;
}

export function useZodFormSubmit<TForm extends FieldValues, TResult>(
  options: UseZodFormSubmitOptions<TForm, TResult>,
) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<TForm, any, TForm>({
    resolver: zodResolver(options.schema) as any,
    mode: "onChange",
    reValidateMode: "onChange",
    ...options.formOptions,
  });

  const clearMessages = () => {
    setError(undefined);
    setSuccess(undefined);
  };

  const handleError = (message: string, values: TForm) => {
    setError(message);
    options.onError?.(message, values);

    if (options.toastOnError) {
      showToast({
        title: "Something went wrong",
        description: message,
        type: "error",
      });
    }

    setTimeout(() => setError(undefined), FORM.timeOut);
  };

  const onSubmit: (values: TForm) => void = (values: TForm) => {
    clearMessages();

    startTransition(async () => {
      try {
        const res = await apiRequest<TForm, TResult>(
          options.request.method,
          options.request.url,
          options.transform ? (options.transform(values) as TForm) : values,
          options.request.apiRequest,
        );

        if (res.data) {
          setSuccess(options.onSuccessMessage);
          options.onSuccess?.(res.data, values);

          setTimeout(() => setSuccess(undefined), FORM.timeOut);
        } else {
          handleError(res.message || "Something went wrong", values);
        }
      } catch {
        handleError("Request failed", values);
      } finally {
        options.onFinally?.();
      }
    });
  };

  return {
    form,
    onSubmit,
    error,
    success,
    isPending,
    resetMessages: clearMessages,
  };
}
