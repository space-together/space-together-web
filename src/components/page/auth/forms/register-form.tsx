"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n";

import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
    type AuthUserDto,
    type RegisterUser,
    RegisterUserSchema,
} from "@/lib/schema/user/auth-user-schema";
import { setAuthCookies } from "@/lib/utils/auth-context";
import { CheckIcon, ChevronRight, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface Props {
  lang: Locale;
}

const RegisterForm = ({ lang }: Props) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);
  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    RegisterUser,
    AuthUserDto
  >({
    schema: RegisterUserSchema,
    formOptions: {
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    },
    request: {
      method: "post",
      url: "/register",
    },
    onSuccessMessage: "Account created successful! ☺️",
    onSuccess: async (data) => {
      if (data.access_token) {
        await setAuthCookies(data.access_token, data.id);
        router.push(`/${lang}/auth/onboarding`);
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <CommonFormField
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          disabled={isPending}
          required
        />

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
          description="Your secret password which you will use to log in."
          render={({ field }) => {
            const [showFeedback, setShowFeedback] = useState(false);

            const handleBlur = () => {
              if (strengthScore < 4) setShowFeedback(true);
              field.onBlur();
            };

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setPassword(value);
              field.onChange(value);
              if (showFeedback) setShowFeedback(false);
            };

            return (
              <div className="space-y-2">
                <div className="group relative">
                  <Input
                    id="password"
                    className={`base text-lg transition-all duration-300 ${
                      showFeedback && strengthScore < 4 && password.length > 0
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-border"
                    }`}
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter password"
                    disabled={isPending}
                    {...field}
                    onChange={handleChange}
                    onBlur={handleBlur}
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

                {showFeedback && strengthScore < 4 && (
                  <div className="animate-fadeIn mt-2">
                    <p className="mb-2 text-sm font-medium text-error">
                      {getStrengthText(strengthScore)}. Must contain:
                    </p>

                    <ul
                      className="grid grid-cols-2 gap-1"
                      aria-label="Password requirements"
                    >
                      {strength.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {req.met ? (
                            <CheckIcon
                              size={16}
                              className="text-success"
                              aria-hidden="true"
                            />
                          ) : (
                            <XIcon
                              size={16}
                              className="text-muted-foreground/80"
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={`text-xs ${
                              req.met
                                ? "text-emerald-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {req.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }}
        />

        <div>
          <FormError message={error} />
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
          Create an account <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
