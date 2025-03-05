"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { sectorSchema, sectorSchemaType } from "@/utils/schema/sectorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, X } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import UseTheme from "@/context/theme/use-theme";
import { IoIosWarning } from "react-icons/io";
import {  createSectorAPI } from "@/services/data/api-fetch-data";
import { Education, Sector } from "../../../prisma/prisma/generated";

interface props {
  educations: Education[] | undefined;
  sector : Sector
}

const UpdateSectorForm =({ educations, sector }: props) => {
    const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
const theme = UseTheme();
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

  const form = useForm<sectorSchemaType>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      name:sector.name ? sector.name : "",
      username:sector.username ? sector.username : "",
      education:sector.education_id ? sector.education_id : "",
      description:sector.description ? sector.description : "",
      logo:sector.symbol ? sector.symbol : "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: sectorSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await createSectorAPI(values);
      setError(result.error || "");
      setSuccess(result.success || "");
      toast.custom((t) => (
        <div
          data-theme={theme}
          className="w-[var(--width)] rounded-lg border border-base-300 bg-base-100 px-4 py-3"
        >
          <div className="flex gap-2">
            <div className="flex grow gap-3">
              {result.success && (
                <CircleCheck
                  className="mt-0.5 shrink-0 text-emerald-500"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
              {result.error && (
                <IoIosWarning
                  className="mt-0.5 shrink-0 text-error"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
              <div className="flex grow justify-between gap-12">
                <p className="text-sm">
                  {result.error}
                  {result.success}
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
    if(!error) {
      form.reset();
    };
  };
  
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-3"
    >
      <div className=" flex space-x-4">
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel
                htmlFor="image"
                className="flex gap-3 items-center"
              >
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
        <div className=" flex flex-col w-full">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Sector name"
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
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Educations</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-2"
                  >
                    {!!educations &&
                      educations.map((item) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={item.id} />
                            </FormControl>
                            <FormLabel className="font-normal flex gap-2 items-center">
                              <MyImage
                                className="size-5"
                                classname=" rounded-full"
                                src={
                                  item.symbol
                                    ? item.symbol
                                    : "/icons/education.png"
                                }
                              />
                              {item.username ? item.username : item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                  </RadioGroup>
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
      <DialogFooter className="px-6 pb-6 sm:justify-end">
        <DialogClose asChild>
          <Button size="sm" type="button" variant="error">
            Delete
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="submit"
            variant="info"
            size="sm"
            className="w-full sm:w-auto"
            disabled={isPending}
          >
            Update Sector
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  </Form>
  )
}

export default UpdateSectorForm
