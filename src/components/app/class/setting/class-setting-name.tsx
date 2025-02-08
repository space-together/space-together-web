"use client";

import React, { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CircleCheck, X } from "lucide-react";
import { IoIosWarning } from "react-icons/io";
import { useDropzone } from 'react-dropzone';

import {
  classUpdateNameSchema,
  classUpdateNameSchemaType,
  classUpdateSymbolSchema,
  classUpdateSymbolSchemaType,
  classUpdateUsernameSchema,
  classUpdateUsernameSchemaType,
} from "@/utils/schema/classSchema";
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
import MyImage from "@/components/my-components/myImage";
import {
  updateClassNameAction,
  updateClassSymbolAction,
  updateClassusernameAction,
} from "@/services/actions/class-action";

interface Props {
  getClass: Class;
}

// Reusable Toast Notification Component
const CustomToast = ({ success, error, onDismiss }: { success?: string; error?: string; onDismiss: () => void }) => (
  <div data-theme="dark" className="w-[var(--width)] rounded-lg border border-border bg-base-100 px-4 py-3">
    <div className="flex gap-2">
      <div className="flex grow gap-3">
        {success ? (
          <CircleCheck className="mt-0.5 shrink-0 text-emerald-500" size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <IoIosWarning className="mt-0.5 shrink-0 text-error" size={16} strokeWidth={2} aria-hidden="true" />
        )}
        <div className="flex grow justify-between gap-12">
          <p className="text-sm">{error || success}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
        onClick={onDismiss}
        aria-label="Close banner"
      >
        <X size={16} strokeWidth={2} className="opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      </Button>
    </div>
  </div>
);

// Reusable Form Submission Handler
const handleFormSubmission = async (
  action: () => Promise<{ success?: string; error?: string }>,
  startTransition: (callback: () => void) => void
) => {
  startTransition(async () => {
    const result = await action();
    toast.custom((t) => (
      <CustomToast success={result.success} error={result.error} onDismiss={() => toast.dismiss(t)} />
    ));
  });
};

// Class Name Setting Component
export const ClassSettingName = ({ getClass }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<classUpdateNameSchemaType>({
    resolver: zodResolver(classUpdateNameSchema),
    defaultValues: { name: getClass.name || "" },
  });

  const onSubmit = (values: classUpdateNameSchemaType) => {
    handleFormSubmission(() => updateClassNameAction(getClass.id, values), startTransition);
  };

  return (
    <Form {...form}>
      <form className="space-y-1 items-center" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <div className="flex space-x-2 items-center">
                  <Input className="w-80" placeholder="Class Name" {...field} />
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

// Class Username Setting Component
export const ClassSettingUsername = ({ getClass }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<classUpdateUsernameSchemaType>({
    resolver: zodResolver(classUpdateUsernameSchema),
    defaultValues: { username: getClass.username || "" },
  });

  const onSubmit = (values: classUpdateUsernameSchemaType) => {
    handleFormSubmission(() => updateClassusernameAction(getClass.id, values), startTransition);
  };

  return (
    <Form {...form}>
      <form className="space-y-1 items-center" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Username</FormLabel>
              <FormControl>
                <div className="flex space-x-2 items-center">
                  <Input className="w-80" placeholder="Class Username" {...field} />
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

// Class Symbol Setting Component

export const ClassSettingSymbol = ({ getClass }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<classUpdateSymbolSchemaType>({
    resolver: zodResolver(classUpdateSymbolSchema),
    defaultValues: { symbol: getClass.symbol || "" },
  });

  const onDrop = (acceptedFiles: File[]) => {
    setError("");
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return setError("Please select an image file.");
    }

    if (file.size > 2 * 1024 * 1024) {
      return setError("Image size exceeds 2MB.");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      form.setValue('symbol', imageDataUrl);
    };
    reader.onerror = () => setError("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: 'image/*',
    maxFiles: 1,
  });

  const onSubmit = (values: classUpdateSymbolSchemaType) => {
    handleFormSubmission(() => updateClassSymbolAction(getClass.id, values), startTransition);
  };

  return (
    <Form {...form}>
      <form className="space-y-1 items-center" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel htmlFor="image" className="flex gap-3 items-center">
                <MyImage
                  src={field.value || "/default.jpg"}
                  className="size-24 min-h-24 min-w-24 rounded-full"
                  alt="Profile"
                />
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} id="image" />
                  <span> Class profile </span>
                </div>
              </FormLabel>
              {error && <p className="text-sm text-error">{error}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
