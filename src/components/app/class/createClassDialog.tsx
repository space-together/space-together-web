"use client";
import CreateClassForm from "@/components/form/create-class-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";

import UseTheme from "@/context/theme/use-theme";
interface props {
  isOpen?: boolean
}

const CreateClassDialog = ({ isOpen }: props) => {

  return (
    <Dialog open={isOpen}>
      <DialogContent data-theme={UseTheme()} className=" sm:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle>Create new Class</DialogTitle>
        </DialogHeader>
        <CreateClassForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateClassDialog
