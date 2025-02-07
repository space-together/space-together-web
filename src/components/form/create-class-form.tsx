"use client";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { classSchema, classSchemaType } from "@/utils/schema/classSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { classService } from "@/services/class-services";
import { FormMessageError, FormMessageSuccess } from "./formError";

const CreateClassForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<classSchemaType>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      trade: "",
      education: "",
      class_teacher: "",
      class_type: "",
      class_room: "",
      is_public: "",
      username: "",
    },
  });

  const handleSubmit = (values: classSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const action = await classService.createClass(values);
      if (action.error) {
        setError(action.error);
      }

      if (action.success) {
        setSuccess(action.success);
        form.reset();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="Class Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describer class (potion)</FormLabel>
              <FormControl>
                <Textarea
                  className=" resize-none"
                  placeholder="Class Name"
                  {...field}
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
            <Button type="button" size="sm" className="">
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

export default CreateClassForm;
