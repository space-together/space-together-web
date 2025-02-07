"use client";
import CreateClassForm from "@/components/form/create-class-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  
} from "@/components/ui/alert-dialog";

import UseTheme from "@/context/theme/use-theme";
interface props {
  isOpen: boolean
}

const CreateClassDialog = ({ isOpen }: props) => {

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent data-theme={UseTheme()} className=" sm:max-w-[32rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>Create new Class</AlertDialogTitle>
        </AlertDialogHeader>
        <CreateClassForm />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreateClassDialog
