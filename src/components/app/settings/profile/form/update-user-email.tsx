"use client";
import {
  updateUserEmailSchema,
  updateUserEmailSchemaType,
} from "@/utils/schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Button } from "@/components/ui/button";

const UpdateUserEmailForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<updateUserEmailSchemaType>({
    resolver: zodResolver(updateUserEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form className=" flex items-center space-x-4">
        <div className=" flex flex-col space-y-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" w-80">
                <FormLabel>change email</FormLabel>
                <FormControl>
                 <div className=" flex space-x-2 items-center">
                 <Input
                    {...field}
                    placeholder="Education name"
                    disabled={isPending}
                    className=" "
                  />
                  <Button variant="info" size="sm">Update email</Button>
                 </div>
                </FormControl>
                <FormDescription>
                  change your email main which used to login, if you update
                  email you have to verify email again!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormMessageError message={error} />
            <FormMessageSuccess message={success} />
          </div>
        </div>
        
      </form>
    </Form>
  );
};

export default UpdateUserEmailForm;
