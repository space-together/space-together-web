"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { UserRole } from "../../../../prisma/prisma/generated";
import { Label } from "@/components/ui/label";

interface props {
  isOpen: boolean;
  lang: Locale;
  userRole: UserRole;
}

const AskIfUserHaveSchoolOrClass = ({ isOpen, userRole }: props) => {
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
        {userRole === "SCHOOLSTAFF" ? (
          <div>
            <div className=" flex items-center space-x-1">
              <input
                id="school-account"
                type="checkbox"
                defaultChecked
                className="checkbox"
              />
              <Label htmlFor="school-account" className=" cursor-pointer">
                Create school account
              </Label>
            </div>
          </div>
        ) : (
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
          {/* <AlertDialogCancel>Get Code</AlertDialogCancel> */}
          <AlertDialogAction className=" w-full">Next</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AskIfUserHaveSchoolOrClass;
