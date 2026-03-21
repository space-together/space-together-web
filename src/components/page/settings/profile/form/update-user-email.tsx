"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
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
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  updateUserEmailDto,
  updateUserEmailSchema,
} from "@/lib/schema/user/user-email.dto";
import { getAccessToken } from "@/lib/utils/client-auth";
import { AtSign } from "lucide-react";

const UpdateUserEmailForm = () => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    updateUserEmailDto,
    unknown
  >({
    schema: updateUserEmailSchema,
    formOptions: {
      defaultValues: {
        email: "",
      },
    },
    request: {
      method: "post",
      url: "/auth/change-email",
      apiRequest: {
        token: getAccessToken() ?? "",
      },
    },
    onSuccessMessage: "Email update requested",
    toastOnError: true,
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-4"
      >
        <div className="flex flex-col space-y-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>change email</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        className="peer w-80 ps-9"
                        placeholder="Email"
                        type="email"
                      />
                      <div className="/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>
                    <Button
                      disabled={isPending}
                      library={"daisy"}
                      variant="info"
                      size="sm"
                      type="submit"
                    >
                      Update email
                    </Button>
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
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserEmailForm;
