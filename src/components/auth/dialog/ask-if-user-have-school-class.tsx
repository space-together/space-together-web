"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { UserRole } from "../../../../prisma/prisma/generated";

interface props {
    isOpen : boolean,
    lang : Locale,
    userRole : UserRole
}

const AskIfUserHaveSchoolOrClass = ({isOpen} : props) => {
  return (
   <AlertDialog open={isOpen}>
         <AlertDialogContent data-theme={UseTheme()} className="">
           <AlertDialogHeader>
             <AlertDialogTitle>Do you have school or class code?</AlertDialogTitle>
             <AlertDialogDescription>
               Code you given by school or class which by schools if you don&apos;t have code you can join hello
             </AlertDialogDescription>
           </AlertDialogHeader>
           as k if user have school
           <AlertDialogFooter>
             <AlertDialogCancel>Get Code</AlertDialogCancel>
             <AlertDialogAction>Use Code</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
  )
}

export default AskIfUserHaveSchoolOrClass
