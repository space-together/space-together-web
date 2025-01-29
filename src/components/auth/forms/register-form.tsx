"use client";

import { authRegisterFormDiction } from "@/locale/types/authDictionTypes";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "@/utils/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { FormMessageError, FormMessageSuccess } from "./form-message";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Locale } from "@/i18n";
import { BeatLoader } from "react-spinners";
import { registerAction } from "@/services/actions/auth/register-actions";
import { useRouter } from "next/navigation";

interface props {
  diction: authRegisterFormDiction;
  lang: Locale;
}

const RegisterForm = ({ diction, lang }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [seePassword, setSeePassword] = useState(false);
  const [isPending, startTransition] = useTransition();
const router = useRouter();
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = (values: registerSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const register = await registerAction(values);

      if (register.error) {
        setError(register.error);
      }

      if (register.success) {
        setSuccess(register.success);
        form.reset();
        return router.push(`${lang}/auth/login`);
      }
    });
  };

  const handleSeePassword = () => {
    setSeePassword((prev) => !prev);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-2"
      >
        <div className=" space-y-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{diction.name}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="(e.g., Mugisha Bruno)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{diction.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isPending}
                    placeholder="(e.g., email@example.com)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" ">{diction.password}</FormLabel>
                <FormControl>
                  <div className=" relative w-full">
                    <Input
                      id="password"
                      {...field}
                      className="w-full"
                      placeholder="(e.g., MyName1!)"
                      type={seePassword ? "text" : "password"}
                      disabled={isPending}
                    />
                    <button
                      className=" absolute right-4 top-2"
                      type="button"
                      onClick={() => handleSeePassword()}
                    >
                      {seePassword ? (
                        <IoEyeOutline size={24} />
                      ) : (
                        <IoEyeOffOutline size={24} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          variant="info"
          className=" w-full"
        >
          {isPending ? <BeatLoader /> : <span>{diction.button}</span>}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
