"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginModel, loginModelTypes } from "@/utils/schema/userSchema";
import { FormMessageError, FormMessageSuccess } from "./form-message";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { authLoginFormDiction } from "@/locale/types/authDictionTypes";
import { BeatLoader } from "react-spinners";
import { loginService } from "@/utils/service/auth/loginService";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";
import { Locale } from "@/i18n";

interface props {
  diction: authLoginFormDiction;
  lang: Locale;
}

export const LoginForm = ({ diction, lang }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [seePassword, setSeePassword] = useState(true);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<loginModelTypes>({
    resolver: zodResolver(LoginModel),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSeePassword = () => {
    setSeePassword((prev) => !prev);
  };

  const onSubmit = (values: loginModelTypes) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      loginService(values).then(async (data) => {
        if (!!data.error) {
          return setError(data.error);
        }
        
        const session = await auth();
        if (!session) return setError("Can not login");
        return router.push(`/${lang}/user`);
      });
    });
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{diction.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isPending}
                    placeholder="your email"
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
                      placeholder="********"
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
          variant="info"
          disabled={isPending}
          className=" w-full"
        >
          {isPending ? <BeatLoader /> : <span>{diction.button}</span>}
        </Button>
      </form>
    </Form>
  );
};
