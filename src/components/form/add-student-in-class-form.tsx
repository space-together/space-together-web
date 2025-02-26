"use client";

import { useState, useTransition, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagInput } from "emblor";
import {
  addPersonSchema,
  addStudentSchemaType,
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
import { FormMessageError, FormMessageSuccess } from "./formError";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { LoaderCircle } from "lucide-react";
import { handleFormSubmission } from "@/hooks/form-notification";
import { sendStudentRequestToJoinClass } from "@/services/actions/send-user-request-action";
import { Textarea } from "../ui/textarea";

interface Props {
  classId: string;
}

const AddStudentInClass = ({ classId }: Props) => {
  const id = useId();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const form = useForm<addStudentSchemaType>({
    resolver: zodResolver(addPersonSchema),
    defaultValues: {
      emails: [],
      message: "",
    },
  });

  const onSubmit = (values: addStudentSchemaType) => {
    setError("");
    setSuccess("");
    handleFormSubmission(
      () => sendStudentRequestToJoinClass(values, classId),
      startTransition
    );
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="emails"
          render={() => (
            <FormItem>
              <FormLabel htmlFor={id}>Students emails</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="emails"
                  render={({ field }) => (
                    <TagInput
                      id={id}
                      tags={field.value || []}
                      setTags={(newTags) => field.onChange(newTags)}
                      placeholder="Add an email"
                      styleClasses={{
                        inlineTagsContainer:
                          " border-myGray rounded-lg bg-base-100 shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
                        input:
                          "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                        tag: {
                          body: "h-7 relative bg-base-100 border  border-myGray hover:bg-base-100 rounded-md font-medium text-xs ps-2 pe-7",
                          closeButton:
                            "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                        },
                      }}
                      activeTagIndex={activeTagIndex}
                      setActiveTagIndex={setActiveTagIndex}
                    />
                  )}
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
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} type="submit" variant="info" size="sm">
            Add new students
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

export default AddStudentInClass;
