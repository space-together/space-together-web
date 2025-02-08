"use client";
import {
  classUpdateNameSchema,
  classUpdateNameSchemaType,
} from "@/utils/schema/classSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
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
import { updateClassNameAction } from "@/services/actions/class-action";
import { toast } from "sonner";
import { CircleCheck, X } from "lucide-react";
import { IoIosWarning } from "react-icons/io";

interface props {
  getClass: Class;
}

const ClassSettingName = ({ getClass }: props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<classUpdateNameSchemaType>({
    resolver: zodResolver(classUpdateNameSchema),
    defaultValues: {
      name: getClass.name ? getClass.name : "",
    },
  });

  const onSubmint = (values: classUpdateNameSchemaType) => {
    startTransition(async () => {
      const action = await updateClassNameAction(getClass.id, values);

      toast.custom((t) => (
        <div data-theme={"dark"} className="w-[var(--width)] rounded-lg border border-border bg-base-100 px-4 py-3">
          <div className="flex gap-2">
            <div className="flex grow gap-3">
              {action.success ? (
                <CircleCheck
                  className="mt-0.5 shrink-0 text-emerald-500"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              ) : (
                <IoIosWarning
                  className="mt-0.5 shrink-0 text-error"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
              <div className="flex grow justify-between gap-12">
                <p className="text-sm">
                  {action.error
                    ? action.error
                    : action.success
                    ? action.success
                    : action.success}
                </p>
                <div className="whitespace-nowrap text-sm">
                  <button className="text-sm font-medium hover:underline">
                    View
                  </button>
                  <span className="mx-1 text-muted-foreground">·</span>{" "}
                  <button
                    className="text-sm font-medium hover:underline"
                    onClick={() => toast.dismiss(t)}
                  >
                    Undo
                  </button>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
              onClick={() => toast.dismiss(t)}
              aria-label="Close banner"
            >
              <X
                size={16}
                strokeWidth={2}
                className="opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      ));
    });
  };
  return (
    <Form {...form}>
      <form
        className=" space-y-1 items-center"
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
