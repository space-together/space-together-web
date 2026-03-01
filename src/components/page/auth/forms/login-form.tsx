"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n";
import { redirectContents } from "@/lib/hooks/redirect";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
    type AuthUserDto,
    type LoginUserDto,
    LoginUserSchema,
} from "@/lib/schema/user/auth-user-schema";
import { setAuthCookies } from "@/lib/utils/auth-context";
import { ChevronRight, EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  lang: Locale;
  oauthError?: string;
}

const LoginForm = ({ lang, oauthError }: Props) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const { form, onSubmit, error, success, isPending, resetMessages } = useZodFormSubmit<
    LoginUserDto,
    AuthUserDto
  >({
    schema: LoginUserSchema,
    formOptions: {
      defaultValues: {
        email: "",
        password: "",
      },
    },
    request: {
      method: "post",
      url: "/login",
    },
    onSuccessMessage: "Welcome back!",
    onSuccess: async (data) => {
      if (data.access_token) {
        await setAuthCookies(
          data.access_token,
          data.id,
          data.school_access_token,
        );

        if (data.role) {
          router.push(redirectContents({ lang, role: data.role }));
        }
      }
    },
  });

  // Handle OAuth error if passed via props
  useEffect(() => {
    if (oauthError) {
      // We don't have a direct way to set the internal error of useZodFormSubmit
      // without exposing it, but we can rely on the FormError component below.
    }
  }, [oauthError]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <CommonFormField
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="example@email.com"
          type="email"
          disabled={isPending}
          required
        />

        <CommonFormField
          control={form.control}
          name="password"
          label="Password"
          fieldType="custom"
          required
          render={({ field }) => (
            <div className="group relative">
              <Input
                id="password"
                className="base text-lg transition-all duration-300"
                type={isVisible ? "text" : "password"}
                placeholder="Enter password"
                disabled={isPending}
                {...field}
              />

              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50
                     absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow]
                     outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOffIcon size={16} aria-hidden="true" />
                ) : (
                  <EyeIcon size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        />

        <div>
          <FormError message={error || oauthError} />
          <FormSuccess message={success} />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          library="daisy"
          variant="info"
          size="lg"
          className="w-full"
          role={isPending ? "loading" : undefined}
        >
          Login <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
