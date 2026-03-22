"use client";

import { useToast } from "@/lib/context/toast/ToastContext";
import { FORM } from "@/lib/env";
import apiRequest, { type ApiRequestOptions } from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  useForm,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import type { ZodTypeAny } from "zod";

interface UseZodFormSubmitOptions<TForm extends FieldValues, TResult> {
  schema: ZodTypeAny;
  formOptions: UseFormProps<TForm>;
  request: {
    method: "post" | "put" | "patch" | "delete";
    url: string | ((values: TForm) => string);
    apiRequest?: ApiRequestOptions;
    /** When true, the request body is omitted (e.g. POST with path-only URL). */
    omitBody?: boolean;
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

  const form = useForm<TForm>({
    resolver: zodResolver(options.schema as any) as any,
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

  const onSubmit = (values: TForm) => {
    clearMessages();

    startTransition(async () => {
      try {
        const url =
          typeof options.request.url === "function"
            ? options.request.url(values)
            : options.request.url;

        const payload = options.request.omitBody
          ? undefined
          : options.transform
            ? options.transform(values)
            : values;

        const res = await apiRequest(
          options.request.method,
          url,
          payload as TForm | undefined,
          options.request.apiRequest,
        );

        if (res.data) {
          setSuccess(options.onSuccessMessage);
          options.onSuccess?.(res.data as TResult, values);

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
    form: form as UseFormReturn<TForm>,
    onSubmit,
    error,
    success,
    isPending,
    resetMessages: clearMessages,
  };
}
