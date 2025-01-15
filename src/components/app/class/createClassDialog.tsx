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
      section : "",
      room : "",
      subjects : undefined,
    }
  })

  const onSubmit = (values : classSchemaType) => {
    console.log(values)
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent data-theme={UseTheme()} className=" sm:max-w-[32rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>Create new Class</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Class Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section (option)</FormLabel>
                  <FormControl>
                    <Input placeholder="Section" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjects (option)</FormLabel>
                  <FormControl>
                    <Input placeholder="Subjects" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room (option)</FormLabel>
                  <FormControl>
                    <Input placeholder="Subjects" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction >Create class</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreateClassDialog
