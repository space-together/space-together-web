"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTeacherInClassSchema,
  addTeacherInClassSchemaType,
} from "@/utils/schema/add-preson-schema";
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
import MultipleSelector from "../ui/multiselect";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  classId: string;
}

const frameworks: Option[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "vue",
    label: "Vue.js",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "ember",
    label: "Ember.js",
  },
  {
    value: "gatsby",
    label: "Gatsby",
  },
  {
    value: "eleventy",
    label: "Eleventy",
  },
  {
    value: "solid",
    label: "SolidJS",
  },
  {
    value: "preact",
    label: "Preact",
  },
  {
    value: "qwik",
    label: "Qwik",
  },
  {
    value: "alpine",
    label: "Alpine.js",
  },
  {
    value: "lit",
    label: "Lit",
  },
];

const AddTeacherInClassForm = ({ classId }: Props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

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
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Education name"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjects"
          render={() => (
            <FormItem>
              <FormLabel>Subjects</FormLabel>
              <FormControl>
                <MultipleSelector
                  commandProps={{
                    label: "Select frameworks",
                  }}
                  defaultOptions={frameworks}
                  placeholder="Select Subjects"
                  emptyIndicator={
                    <p className="text-center text-sm">No results found</p>
                  }
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
              <FormLabel>Send Message</FormLabel>
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
