import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  subjectSchema,
  subjectSchemaType,
} from "@/utils/schema/subject-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import MyImage from "../my-components/myImage";
import { useDropzone } from "react-dropzone";
import { Textarea } from "../ui/textarea";
import { FormMessageError, FormMessageSuccess } from "./formError";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { handleFormSubmission } from "@/hooks/form-notification";
import { createSubjectAction } from "@/services/actions/subject-cations";

interface props {
  classId : string;
}

const CreateSubjectForm = ({classId} : props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<subjectSchemaType>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      code: "",
      purpose: "",
      learningHours: "",
      symbol: "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
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
        form.setValue("symbol", imageDataUrl);
      };
      reader.onerror = () => setError("Failed to read image file.");
      reader.readAsDataURL(file);
    };
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      // accept: 'image/*',
      maxFiles: 1,
    });

  const handleSubmit = (values: subjectSchemaType) => {
    setError("");
    setSuccess("");
    handleFormSubmission(() => createSubjectAction(values, classId), startTransition);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-2">
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel htmlFor="image" className="flex gap-3 items-center">
                <div className=" flex space-x-2 items-center">
                  <MyImage
                    src={field.value || "/default.jpg"}
                    className="size-24 min-h-24 min-w-24 rounded-full"
                    alt="Profile"
                  />
                  <div {...getRootProps()} className="cursor-pointer">
                    <FormControl>
                      <input
                        disabled={isPending}
                        {...getInputProps()}
                        id="image"
                      />
                    </FormControl>
                    <span> Subject symbol </span>
                  </div>
                </div>
              </FormLabel>
              {error && <p className="text-sm text-error">{error}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Subject name"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Subject code"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="learningHours"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learning hours</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Subject code"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="purpose"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Purpose of subject"
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

export default CreateSubjectForm;
