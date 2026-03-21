"use client";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  CreateManSubClassesSchema,
  type Class,
  type CreateManSubClasses,
} from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import apiRequest from "@/service/api-client";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
  cls?: Class;
  name?: string;
  title?: string;
}

const CreateManySubClasses = ({ auth, cls, name, title }: Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingclass, setLoadingclass] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    const loadTrades = async () => {
      try {
        if (cls) {
          setClasses([]);
          return;
        }

        const res = await apiRequest<void, Class[]>(
          "get",
          "/school/classes",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (res.data) {
          setClasses(res.data);
        }
      } finally {
        setLoadingclass(false);
      }
    };

    loadTrades();
  }, [auth.token, cls]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    CreateManSubClasses,
    Class[]
  >({
    schema: CreateManSubClassesSchema,
    formOptions: {
      defaultValues: {
        class_id: cls ? cls._id || cls.id || "" : "",
        count: "2",
      },
      mode: "onChange",
    },
    request: {
      method: "post",
      url: (values) =>
        `/school/classes/${values.class_id}/subclasses/count/${values.count}`,
      apiRequest: { token: auth.token, schoolToken: auth.schoolToken },
      omitBody: true,
    },
    onSuccessMessage: "",
    toastOnError: true,
    onSuccess: (data) => {
      const message = `${data.length} sub classes created`;
      showToast({
        title: "Sub classes created",
        description: message,
        type: "success",
      });
      if (!cls) form.reset();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={name ? "ghost" : "secondary"}
          role={name ? undefined : "create"}
          size={"xs"}
          library="daisy"
        >
          {name ?? "Add sub class"}
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title ?? "Create sub classes"}</DialogTitle>
        </DialogHeader>
        <main>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {!cls && (
                <CommonFormField
                  control={form.control}
                  name="class_id"
                  label="Classes"
                  fieldType="searchSelect"
                  placeholder={
                    loadingclass ? "Loading trades..." : "Select class"
                  }
                  disabled={isPending || loadingclass}
                  selectOptions={classes.map((t) => ({
                    value: String(t.id ?? t._id),
                    label: t.name,
                    disable: t.is_active,
                  }))}
                />
              )}

              <CommonFormField
                control={form.control}
                name="count"
                label="number of sub classes"
                type="number"
                placeholder="number of sub classes"
                disabled={isPending}
              />

              {/* ---------- Messages ---------- */}
              <FormError message={error} />
              <FormSuccess message={success} />

              <DialogFooter className="px-6 pb-6 sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline" library="daisy">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="info"
                  disabled={isPending}
                  className="w-full sm:w-auto"
                  role={isPending ? "loading" : undefined}
                  library="daisy"
                >
                  {cls ? "Update Class" : "Add Class"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default CreateManySubClasses;
