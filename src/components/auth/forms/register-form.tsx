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
import { UserRoleModel } from "@/utils/models/userModel";
import { FetchError } from "@/utils/types/fetchTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

    const validation = registerSchema.safeParse(values);
    if (!validation.success) {
      return setError("Invalid Register Validation");
    }

    startTransition(async () => {
      const result = await createUserAPI(validation.data);

      if ("message" in result) {
        setError(result.message);
      } else {
        // It's a success
        setSuccess("User created successfully!");
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
         <div className=" flex gap-2 w-full">
         <FormField
            control={form.control}
            name="rl"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className=" w-1/2">
                <FormLabel>{diction.role}</FormLabel>
                <Select
                  disabled={"message" in userRoles || isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className=" w-full">
                    <SelectTrigger  className="">
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
            control={form.control}
            name="gd"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{diction.gender.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex  space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <FormLabel className="font-normal">{diction.gender.label}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <FormLabel className="font-normal">{diction.gender.female}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="O"/>
                      </FormControl>
                      <FormLabel className="font-normal">{diction.gender.other}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         </div>
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
        <Button type="submit" variant="info" className=" w-full">
          {diction.button}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
