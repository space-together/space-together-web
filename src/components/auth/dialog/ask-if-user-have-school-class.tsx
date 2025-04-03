"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { UserRole } from "../../../../prisma/prisma/generated";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { LoadingIcon } from "@/components/my-components/loading";

interface props {
  isOpen: boolean;
  lang: Locale;
  userRole: UserRole;
}

const AskIfUserHaveSchoolOrClass = ({ isOpen, userRole, lang }: props) => {
  const [isPending, startTransition] = useTransition();
  const handleSchoolStaff = (yes?: boolean) => {
    startTransition(() => {
      if (yes) return redirect(`/${lang}/school-staff`);
      return redirect(`${lang}/school-staff/create-school`);
    });
  };
  // TODO : to make if user is student and teacher
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent data-theme={UseTheme()} className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you have school {userRole !== "SCHOOLSTAFF" && "or class"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {userRole === "SCHOOLSTAFF"
              ? "Create school account "
              : "This will help you to get school or class if you have it and school use this system will be easy use access it."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {userRole !== "SCHOOLSTAFF" && (
          <div className=" flex flex-col space-y-2">
            <div className=" flex items-center space-x-1">
              <input
                id="class"
                type="checkbox"
                defaultChecked
                className="checkbox"
              />
              <Label htmlFor="class" className=" cursor-pointer">
                Do you have class
              </Label>
            </div>
            <div className=" flex items-center space-x-1">
              <input
                id="school"
                type="checkbox"
                defaultChecked
                className="checkbox"
              />
              <Label htmlFor="school" className=" cursor-pointer">
                Do you have School
              </Label>
            </div>
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => handleSchoolStaff()}
          >
            {!isPending ? (
              "No"
            ) : (
              <>
                <LoadingIcon /> Proccess...
              </>
            )}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => handleSchoolStaff(true)}
          >
             {!isPending ? (
              "Yes"
            ) : (
              <>
                <LoadingIcon /> Proccess...
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AskIfUserHaveSchoolOrClass;
