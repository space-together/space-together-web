"use client";

import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  type EditStudentDto,
  editStudentSchema,
} from "@/lib/schema/table-forms/forms";
import { getAccessToken } from "@/lib/utils/client-auth";

interface props {
  onClose: () => void;
}

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const classOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L3", label: "L3" },
];

const EditStudentInSchoolForm = ({ onClose }: props) => {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    EditStudentDto,
    unknown
  >({
    schema: editStudentSchema,
    formOptions: {
      defaultValues: {
        id: "",
        name: "",
        email: "",
        gender: "Male",
        age: "",
        class: "L1",
        phone: "",
      },
    },
    request: {
      method: "put",
      url: (values) => `/students/${values.id}`,
      apiRequest: {
        token: getAccessToken() ?? "",
      },
    },
    onSuccessMessage: "Student updated",
    toastOnError: true,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <CommonFormField
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter student name"
            disabled={isPending}
          />
          <CommonFormField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email address"
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CommonFormField
            control={form.control}
            name="gender"
            label="Gender"
            fieldType="select"
            placeholder="Select gender"
            selectOptions={genderOptions}
            disabled={isPending}
          />
          <CommonFormField
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="Enter phone number"
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CommonFormField
            control={form.control}
            name="class"
            label="Class"
            fieldType="select"
            placeholder="Select class"
            selectOptions={classOptions}
            disabled={isPending}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <AlertDialogCancel asChild onClick={() => onClose()}>
          <Button variant="outline" type="button" disabled={isPending}>
            Cancel
          </Button>
        </AlertDialogCancel>
        <Button type="submit" disabled={isPending}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EditStudentInSchoolForm;
