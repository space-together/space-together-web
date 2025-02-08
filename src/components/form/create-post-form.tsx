"use client";
import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { postSchema, PostSchemaType } from "@/utils/schema/postSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { handleFormSubmission } from "@/hooks/form-notification";
import { CreatePostAction } from "@/services/actions/post-actions";

interface props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  classId ?: string
}

const CreatePostForm = ({setIsOpen , classId} : props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content : "",
      file : ""
    },
  });

  const onSubmit = (values: PostSchemaType) => {
    handleFormSubmission (() => CreatePostAction(values, classId),startTransition)
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel><span className=" happy-title-base">Announce something ...</span></FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <FormLabel>Upload</FormLabel>
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
        <div className="  space-x-4 mt-4 justify-end w-full flex">
          <Button onClick={() => setIsOpen(false)} type="button" size="sm" className="">
            Cancel
          </Button>

          <Button disabled={isPending} type="submit" variant="info" size="sm">
            Post
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
