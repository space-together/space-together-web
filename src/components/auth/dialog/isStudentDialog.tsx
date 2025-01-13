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

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { OTPInput, SlotProps } from "input-otp";
import { Minus } from "lucide-react";
import { useId as user_id, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Locale } from "@/i18n";

interface props {
  isOpen: boolean;
  userId: string;
  lang : Locale
}
type codeType = "school" | "class";
const IsStudentDialog = ({ isOpen , lang ,}: props) => {
  const [codeRole , setCodeRole] = useState<codeType>("school");

  const handleChangeCode = () => {
    setCodeRole(codeRole === "school" ? "class" : "school") 
  }

  const id = user_id();
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent data-theme={UseTheme()} className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you have school or class code?</AlertDialogTitle>
          <AlertDialogDescription>
            Code you given by school or class which by schools if you don&apos;t have code you can join <Link href={`/${lang}/school`} className=" link hover:text-info duration-200">public schools or classes</Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" space-y-2">
          <div className="space-y-2">
            <Label htmlFor={id}>{codeRole} Code</Label>
            <OTPInput
              id={id}
              containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
              maxLength={6}
              render={({ slots }) => (
                <>
                  <div className="flex">
                    {slots.slice(0, 3).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>

                  <div className="text-muted-foreground/80">
                    <Minus size={16} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="flex">
                    {slots.slice(3).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                </>
              )}
            />
          </div>
          <Button variant="ghost" size="xs" className=" underline" onClick={() => handleChangeCode()}>Use {codeRole} code</Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Get Code</AlertDialogCancel>
          <AlertDialogAction>Use Code</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IsStudentDialog;

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative -ms-px flex size-9 items-center justify-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-border font-medium text-foreground shadow-sm shadow-black/5 transition-shadow first:ms-0 first:rounded-s-lg last:rounded-e-lg",
        { "z-10 border border-ring ring-[3px] ring-ring/20": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
