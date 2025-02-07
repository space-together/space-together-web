import React from "react";
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

const CreateClassForm = () => {
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

  const onSubmit = (values: classSchemaType) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
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
              <FormLabel>Describer class</FormLabel>
              <FormControl>
                <Textarea className=" resize-none" placeholder="Class Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose><Button size="sm" className="">Cancel</Button></DialogClose>
          <Button variant="info" size="sm">Create class</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateClassForm;
