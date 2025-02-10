import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { subjectSchema, subjectSchemaType } from "@/utils/schema/subject-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const CreateSubjectForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [isPending, startTransition] = useTransition();

    const form = useForm<subjectSchemaType>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
          name: "",
          username: "",
          sector: "",
          description: "",
          logo: "",
          class_rooms: 3,
        },
        shouldFocusError: true,
        shouldUnregister: true,
        criteriaMode: "firstError",
        reValidateMode: "onChange",
        mode: "onChange",
      });

       const handleSubmit = (values: tradeSchemaType) => {
            setError("");
            setSuccess("");
            startTransition(async () => {
              const action = await createTradeAction(values);
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
      <form>

      </form>
    </Form>
  )
}

export default CreateSubjectForm
