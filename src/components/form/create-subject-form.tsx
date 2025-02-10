import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleFormSubmission } from "@/hooks/form-notification";
import {
  subjectSchema,
  subjectSchemaType,
} from "@/utils/schema/subject-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

const CreateSubjectForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<subjectSchemaType>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      code: "",
      purpose: "",
      learningHours: 10,
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: subjectSchemaType) => {
    setError("");
    setSuccess("");
    // handleFormSubmission(
    //   () => console.log(values),
    //   startTransition
    // );
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                <span className="cursor-pointer">Education Symbol</span>
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
                <Input {...field} placeholder="Username" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
      </form>
    </Form>
  );
};

export default CreateSubjectForm;
