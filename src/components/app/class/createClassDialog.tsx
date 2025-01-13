"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

import UseTheme from "@/context/theme/use-theme";
import { classSchema, classSchemaType } from "@/utils/schema/classSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface props {
  isOpen: boolean
}

const CreateClassDialog = ({ isOpen }: props) => {
  const form = useForm<classSchemaType>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
    }
  })

  const onSubmit = (values : classSchemaType) => {
    console.log(values)
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent data-theme={UseTheme()} className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Create new Class</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>
                Create class
              </AlertDialogCancel>
              <AlertDialogAction >Use Code</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreateClassDialog
