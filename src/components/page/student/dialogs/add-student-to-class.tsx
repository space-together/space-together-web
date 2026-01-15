"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Paginated } from "@/lib/schema/common-schema";
import type { Student } from "@/lib/schema/student/student-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
const AddStudentToClassSchema = z.object({
  class_id: z.string(),
});

type AddStudentToClass = z.infer<typeof AddStudentToClassSchema>;

interface AddStudentToClassProps {
  student: Student;
  auth: AuthContext;
}

const AddStudentToClass = ({ student, auth }: AddStudentToClassProps) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await apiRequest<void, Paginated<Class>>(
          "get",
          "/school/classes",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (res.data) {
          setClasses(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch classes", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchClasses();
  }, [auth]);

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    AddStudentToClass,
    Student
  >({
    schema: AddStudentToClassSchema,
    formOptions: {
      defaultValues: {
        class_id: student?.class_id ?? undefined,
      },
    },

    request: {
      method: student ? "put" : "post",
      url: `/school/students/${student._id || student.id}`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },

    onSuccessMessage: student
      ? "Student updated successfully"
      : "Student created successfully",

    toastOnError: true,

    onSuccess: () => {
      if (!student) form.reset();
      router.refresh();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Add to Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CommonFormField
              control={form.control}
              name="class_id"
              label="Class"
              fieldType="searchSelect"
              placeholder={
                loadingOptions ? "Loading classes..." : "Select a class"
              }
              disabled={isPending || loadingOptions}
              selectOptions={classes.map((c) => ({
                value: String(c.id ?? c._id),
                label: c.name,
              }))}
            />
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
                library="daisy"
                disabled={isPending}
                role={isPending ? "loading" : undefined}
              >
                Add class
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentToClass;
