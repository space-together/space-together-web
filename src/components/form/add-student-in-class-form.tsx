"use client";

import { useState, useTransition, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagInput } from "emblor";
import {
  addPersonSchema,
  addPersonSchemaType,
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
import { sendPeopleRequestToJoinClass } from "@/services/actions/send-user-request-action";

interface Props {
  classId: string;
}

const AddStudentInClass = ({ classId }: Props) => {
  const id = useId();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const form = useForm<addPersonSchemaType>({
    resolver: zodResolver(addPersonSchema),
    defaultValues: {
      emails: [], // Initialize as an empty array
    },
  });

  const onSubmit = (values: addPersonSchemaType) => {
    setError("");
    setSuccess("");
    handleFormSubmission(
      () => sendPeopleRequestToJoinClass(values, classId),
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
              <FormLabel htmlFor={id}>Add teachers emails</FormLabel>
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
                          "border-input rounded-lg bg-base-100 shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
                        input:
                          "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                        tag: {
                          body: "h-7 relative bg-base-100 border border-input hover:bg-base-100 rounded-md font-medium text-xs ps-2 pe-7",
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
            Create class
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
