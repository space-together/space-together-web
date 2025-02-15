"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState, useTransition } from "react";
import {
  classUpdateSchema,
  classUpdateSchemaType,
} from "@/utils/schema/classSchema";
import { useDropzone } from "react-dropzone";
import MyImage from "../my-components/myImage";
import { Textarea } from "../ui/textarea";
import { Class } from "../../../prisma/prisma/generated";
import { updateClassAction } from "@/services/actions/class-action";
import { handleFormSubmission } from "@/hooks/form-notification";
import { LoaderCircle } from "lucide-react";

interface props {
  currentClass: Class;
  classId: string;
}

export const UpdateClassForm = ({ currentClass, classId }: props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<classUpdateSchemaType>({
    resolver: zodResolver(classUpdateSchema),
    defaultValues: {
      name: currentClass.name ? currentClass.name : "",
      symbol: currentClass.symbol ? currentClass.symbol : "",
      username: currentClass.username ? currentClass.username : "",
      description: currentClass.description ? currentClass.description : "",
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    setError("");
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return setError("Please select an image file.");
    }

    if (file.size > 10 * 1024 * 1024) {
      return setError("Image size exceeds 10MB.");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      form.setValue("symbol", imageDataUrl);
    };
    reader.onerror = () => setError("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  const { getInputProps } = useDropzone({
    onDrop,
    // accept: "image/*",
    maxFiles: 1,
  });
  const onSubmit = (values: classUpdateSchemaType) => {
    setError("");
    handleFormSubmission(
      () => updateClassAction(values, classId),
      startTransition
    );
  };

  return (
    <Form {...form}>
      <form className="  space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex space-x-4 w-full">
          <div className=" space-y-4  w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Class Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Class Username"
                      {...field}
                    />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Explain class ....."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" p-10">
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem className="items-center">
                  <FormLabel
                    htmlFor="image"
                    className="flex gap-3 items-center"
                  >
                    <div className=" flex flex-col space-y-2 items-center">
                      <div className=" space-y-2">
                        <FormLabel className="">Class symbol</FormLabel>
                        <MyImage
                          role="AVATAR"
                          src={field.value || "/default.jpg"}
                          className="size-40 min-h-36 min-w-36 "
                          alt="Profile"
                        />
                      </div>
                      <FormControl>
                        <input
                          disabled={isPending}
                          {...getInputProps()}
                          id="image"
                        />
                      </FormControl>
                    </div>
                  </FormLabel>
                  {error && <p className="text-sm text-error">{error}</p>}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" variant="info" disabled={isPending}>
          Update class
          {isPending && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={12}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </form>
    </Form>
  );
};
