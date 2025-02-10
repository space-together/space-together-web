"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { NoteSchema, NoteSchemaType } from "@/utils/schema/note-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { createNoteAction } from "@/services/actions/note-action";
import { FormMessageError, FormMessageSuccess } from "./formError";
import { handleFormSubmission } from "@/hooks/form-notification";

interface props {
  subjectId : string ,
}

const CreateNoteForm = ({subjectId} : props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<NoteSchemaType>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {},
  });
  const onSubmit = (values : NoteSchemaType) => {
    setError("");
    setSuccess("");
    handleFormSubmission(() => createNoteAction(values, subjectId), startTransition);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <FormLabel>Upload notes</FormLabel>
                  <Input
                    {...field}
                    className=" pe-3 file:me-3 file:border-0 file:border-e"
                    type="file"
                  />
                </div>
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
            <Button type="button" size="sm" className="">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} type="submit" variant="info" size="sm">
            Add notes
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

export default CreateNoteForm;
