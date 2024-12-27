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
import { toast } from "@/hooks/use-toast";
import { UserRoleModel } from "@/utils/models/userModel";
import { FetchError } from "@/utils/types/fetchTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseTheme from "@/context/theme/use-theme";
import { useState, useTransition } from "react";
import { FormMessageError, FormMessageSuccess } from "./form-message";
import { createUserAPI } from "@/utils/service/functions/fetchDataFn";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface props {
  diction: authRegisterFormDiction;
  userRoles: UserRoleModel[] | FetchError;
}

const RegisterForm = ({ diction, userRoles }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [seePassword, setSeePassword] = useState(true);
  const [isPending, startTransition] = useTransition();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      em: "",
      nm: "",
      pw: "",
      gd: undefined,
      rl: "",
    },
  });

  const onSubmit = (values: registerSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await createUserAPI(values);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        // It's a success
        setSuccess("User created successfully!");
        toast({
          title: "User created successfully 😁",
          description: <div>user: {result.nm}</div>,
        });
        form.reset();
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
            name="nm"
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
            name="em"
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
            control={form.control}
            name="rl"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{diction.role}</FormLabel>
                <Select
                  disabled={"message" in userRoles || isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {Array.isArray(userRoles) &&
                      userRoles.map((role) => (
                        <SelectItem key={role.rl} value={role.id}>
                          {role.rl}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <div className=" ">
                  {"message" in userRoles && (
                    <FormMessageError message={userRoles.message} />
                  )}
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="pw"
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
        <Button type="submit" variant="info" className=" w-full">{diction.button}</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
