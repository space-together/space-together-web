"use client";

import { BsGearWide } from "react-icons/bs";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import UseTheme from "@/context/theme/use-theme";

interface props {
  lang: Locale;
}

const AuthSetting = ({ lang }: props) => {
  const theme = UseTheme();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          shape="circle"
          className=" absolute right-2 top-2 btn-square btn-circle"
        >
          <BsGearWide size={24} />{" "}
          <span className=" sr-only">auth setting</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-theme={theme}>
        <AlertDialogHeader>
          <AlertDialogTitle>Auth setting</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthSetting;
