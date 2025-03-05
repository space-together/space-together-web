"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import MyImage from "@/components/my-components/myImage";
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
import { Textarea } from "@/components/ui/textarea";
import {
  educationSchemaTypeUpdate,
  educationSchemaUpdate,
} from "@/utils/schema/educationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, Trash2, X } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { updateEducationAPI } from "@/services/data/api-fetch-data";
import { toast } from "sonner";
import UseTheme from "@/context/theme/use-theme";
import { IoIosWarning } from "react-icons/io";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Education } from "../../../prisma/prisma/generated";

interface props {
  education: Education;
}

const UpdateEducationForm = ({ education }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const theme = UseTheme();
  const form = useForm<educationSchemaTypeUpdate>({
    resolver: zodResolver(educationSchemaUpdate),
    defaultValues: {
      name: education.name ? education.name : "",
      username: education.username ? education.username : "",
      description: education.description ? education.description : "",
      logo: "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();

    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (!file.type.includes("image")) {
        return setError("Please select an image file.");
      }

      if (file.size > 2 * 1024 * 1024) {
        return setError("Image size exceeds 2MB.");
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        fieldChange(imageDataUrl);
      };
      reader.onerror = () => setError("Failed to read image file.");
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: educationSchemaTypeUpdate) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await updateEducationAPI(values, education.id);
      setError(result.error || "");
      setSuccess(result.success || "");
      toast.custom((t) => (
        <div
          data-theme={theme}
          className="w-[var(--width)] rounded-lg border border-base-300 bg-base-100 px-4 py-3"
        >
          <div className="flex gap-2">
            <div className="flex grow gap-3">
              {success && (
                <CircleCheck
                  className="mt-0.5 shrink-0 text-emerald-500"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
              {error && (
                <IoIosWarning
                  className="mt-0.5 shrink-0 text-error"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
              <div className="flex grow justify-between gap-12">
                <p className="text-sm">
                  {error}
                  {success}
                </p>
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <div className=" flex space-x-4">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="flex gap-2 items-center">
                <FormLabel htmlFor="image" className="flex gap-3 items-center">
                  <MyImage
                    src={field.value || "/default.jpg"}
                    className="size-24 min-h-24 min-w-24 rounded-full"
                    alt="Profile"
                  />
                  <span className="cursor-pointer">Symbol</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="  flex flex-col space-y-2 w-full">
            <FormField
              name="name"
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
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Description"
                  disabled={isPending}
                  className=" resize-none"
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
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" size="sm" variant="error">
            <Trash2 />  Delete
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="info"
            size="sm"
            className="w-full sm:w-auto"
            disabled={isPending}
          >
            Update Education
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

export default UpdateEducationForm;
