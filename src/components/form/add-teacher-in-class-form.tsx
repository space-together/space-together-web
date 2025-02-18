"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTeacherInClassSchema,
  addTeacherInClassSchemaType,
} from "@/utils/schema/add-person-schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormMessageError, FormMessageSuccess, FormMessageWarning } from "./formError";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { LoaderCircle } from "lucide-react";
import MultipleSelector ,{ Option }from "../ui/multiselect";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { sendTeacherRequestToJoinClass } from "@/services/actions/send-user-request-action";
import { handleFormSubmission } from "@/hooks/form-notification";
import { Subject } from "../../../prisma/prisma/generated";
import UseTheme from "@/context/theme/use-theme";

interface Props {
  classId: string;
  classSubjects ?: Subject[] | null
}

const AddTeacherInClassForm = ({ classId, classSubjects }: Props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [warning , setWarning] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const subjects : Option[] = classSubjects?.map(({id, name}) => ({
    label : name,
    value : id
  })) || [];  

  const form = useForm<addTeacherInClassSchemaType>({
    resolver: zodResolver(addTeacherInClassSchema),
    defaultValues: {
      email: "",
      subjects: [],
      message: "",
    },
  });

  const onSubmit = (values: addTeacherInClassSchemaType) => {
    setError("");
    setSuccess("");
    setWarning("")
    handleFormSubmission(
      () => sendTeacherRequestToJoinClass(values, classId),
      startTransition
    );
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder="Education name"
                  disabled={isPending}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjects"
          render={({field}) => (
            <FormItem>
              <FormLabel>Subjects</FormLabel>
                <FormControl>
                <MultipleSelector
                 data-theme={UseTheme()}
                  commandProps={{
                  label: "Select frameworks",
                  }}
                  defaultOptions={subjects}
                  placeholder="Select Subjects"
                  emptyIndicator={
                  <p className="text-center text-sm">No results found</p>
                  }
                  value={subjects.filter(subject => field.value.includes(subject.value))}
                  onChange={(selected) => field.onChange(selected.map((option) => option.value))}
                />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Type message...."
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
          <FormMessageWarning message={warning} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} type="submit" variant="info" size="sm">
            Add teacher
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddTeacherInClassForm;
