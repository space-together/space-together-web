"use client";
import {
  classUpdateNameSchema,
  classUpdateNameSchemaType,
} from "@/utils/schema/classSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Class } from "../../../../../prisma/prisma/generated";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface props {
  getClass: Class;
}

const ClassSettingName = ({ getClass }: props) => {
  const form = useForm<classUpdateNameSchemaType>({
    resolver: zodResolver(classUpdateNameSchema),
    defaultValues: {
      name: getClass.name ? getClass.name : "",
    },
  });

  const onSubmint = (values: classUpdateNameSchemaType) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        className=" flex gap-2 items-center"
        onSubmit={form.handleSubmit(onSubmint)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <div className=" flex space-x-2 items-center">
                  <Input
                    className=" w-80"
                    placeholder="Class Name"
                    {...field}
                  />
                  <Button type="submit" size="sm" variant="outline">
                    Rename
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ClassSettingName;
