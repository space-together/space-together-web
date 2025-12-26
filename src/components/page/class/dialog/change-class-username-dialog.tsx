"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { Locale } from "@/i18n";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import { ClassSchema, type Class } from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { z } from "zod";

interface ChangeClassUsernameDialogProps {
  cls: Pick<Class, "_id" | "username">;
  auth: AuthContext;
  lang: Locale;
}

const changeClassUsernameSchema = ClassSchema.pick({
  username: true,
}).partial();

type ChangeClassUsername = z.infer<typeof changeClassUsernameSchema>;

const ChangeClassUsernameDialog = ({
  cls,
  auth,
  lang,
}: ChangeClassUsernameDialogProps) => {
  const router = useRouter();
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ChangeClassUsername,
    Class
  >({
    schema: changeClassUsernameSchema,
    formOptions: {
      defaultValues: {
        username: cls?.username || "",
      },
    },
    request: {
      method: "put",
      url: `/school/classes/${cls._id}`,
      auth: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: "Class username changed successfully 🫡",
    onSuccess: (res) => {
      router.push(`/${lang}/c/${res.username}`);
    },
    toastOnError: true,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} library="daisy" className="w-fit">
          Change Class Username
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Class Username</DialogTitle>
          <Alert variant="warning">
            <AlertCircleIcon />
            <AlertTitle className="line-clamp-none font-normal">
              This action will change the class URL. Old links will stop
              working, and users must use the new link to access the class.
            </AlertTitle>
          </Alert>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-4"
          >
            <CommonFormField
              name="username"
              control={form.control}
              label="New class username"
              description="Enter a new username for your class."
              placeholder="Enter a new username"
              disabled={isPending}
            />
            {error ||
              (success && (
                <div className=" flex flex-col my-2">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                </div>
              ))}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} library="daisy" className="w-fit">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                role={isPending ? "loading" : undefined}
                library="daisy"
                className="w-fit"
                variant="info"
                disabled={
                  isPending ||
                  (!form.formState.isDirty &&
                    !form.formState.isSubmitSuccessful)
                }
              >
                Change Username
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeClassUsernameDialog;
