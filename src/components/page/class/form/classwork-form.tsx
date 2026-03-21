"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ClassworkTypes } from "@/lib/const/common-details-const";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  ClassWorkSchema,
  type ClassWork,
} from "@/lib/schema/class/classwork-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { IoIosLink } from "react-icons/io";
import { LuUpload } from "react-icons/lu";

interface ClassWorkFormProps {
  auth: AuthContext;
  classUsername?: string;
  subjectCode?: string;
}

function ClassWorkForm({
  auth,
  classUsername,
  subjectCode,
}: ClassWorkFormProps) {
  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    ClassWork,
    unknown
  >({
    schema: ClassWorkSchema,
    formOptions: {
      defaultValues: {
        title: "",
        description: "",
        type: "Exercise",
        points: 50,
        mention: [],
        allow_close_submissions: true,
      },
      mode: "onChange",
    },
    transform: (values) => ({
      ...values,
      class_username: classUsername,
      subject_code: subjectCode,
    }),
    request: {
      method: "post",
      url: "/classwork",
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: "Class work created successfully",
    toastOnError: true,
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className=" flex flex-row gap-4">
          <div className=" flex flex-col gap-4 w-1/2">
            <CommonFormField
              label="Title"
              name="title"
              type="text"
              fieldType="input"
              placeholder="Title..."
              required
              control={form.control}
              disabled={isPending}
            />
            <CommonFormField
              label="Description"
              name="description"
              type="text"
              fieldType="textarea"
              placeholder="Description..."
              control={form.control}
              disabled={isPending}
            />
            <CommonFormField
              label="Class work Type"
              name="type"
              type="text"
              fieldType="select"
              required
              placeholder="Select type"
              control={form.control}
              disabled={isPending}
              selectOptions={ClassworkTypes.map((t) => ({
                label: t,
                value: t,
              }))}
            />
            <div className=" card w-full space-y-2">
              <Label>Attachment</Label>
              <div className=" flex items-center flex-row gap-2 ">
                <Button
                  title="Upload file"
                  library="daisy"
                  variant={"outline"}
                  type="button"
                  disabled={isPending}
                >
                  <LuUpload />
                </Button>
                <Button
                  title="Add Link"
                  library="daisy"
                  variant={"outline"}
                  type="button"
                  disabled={isPending}
                >
                  <IoIosLink />
                </Button>
              </div>
            </div>
          </div>
          <div className=" w-1/2 flex flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="mention"
              label="Assign to"
              fieldType="sign-to"
              disabled={isPending}
              signToInput={{
                title: "Assign to",
                name: "All students",
                users: [],
              }}
            />
            <CommonFormField
              label="Points"
              name="points"
              type="number"
              fieldType="input"
              placeholder="eg: 50"
              inputProps={{
                numberMode: "percent",
              }}
              required
              control={form.control}
              disabled={isPending}
            />
            <CommonFormField
              label="Due"
              name="due_date"
              type="number"
              fieldType="date"
              placeholder="eg: 50"
              inputProps={{
                numberMode: "percent",
              }}
              required
              control={form.control}
              disabled={isPending}
              dateProps={{ inputType: "date-time" }}
            />
            <CommonFormField
              label="All student can submit after due date"
              name="allow_close_submissions"
              fieldType="checkbox"
              placeholder="Description..."
              control={form.control}
              disabled={isPending}
            />
            <CommonFormField
              label="Topic"
              name="topic_id"
              fieldType="select"
              required
              placeholder="Select topic"
              control={form.control}
              disabled={isPending}
              selectOptions={ClassworkTypes.map((t) => ({
                label: t,
                value: t,
              }))}
            />
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          variant="info"
          library="daisy"
          disabled={isPending}
          role={isPending ? "loading" : undefined}
        >
          Create class work
        </Button>
      </form>
    </Form>
  );
}

export default ClassWorkForm;
