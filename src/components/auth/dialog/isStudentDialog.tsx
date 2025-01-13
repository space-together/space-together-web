"use client";
import {
  AlertDialog,
  //   AlertDialogPortal,
  //   AlertDialogOverlay,
  //   AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  //   AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  //   AlertDialogAction,
  //   AlertDialogCancel,
} from "@/components/ui/alert-dialog";
// import { Input } from "@/components/ui/input";
import UseTheme from "@/context/theme/use-theme";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { OTPInput, SlotProps } from "input-otp";
import { Minus } from "lucide-react";
import { useId as user_id } from "react";

interface props {
  isOpen: boolean;
  userId: string;
}
const IsStudentDialog = ({ isOpen }: props) => {
  const id = user_id();
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent data-theme={UseTheme()} className=" min-w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you have school or class code?</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your school code
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <div className="space-y-2">
            <Label htmlFor={id}>OTP input double</Label>
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
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IsStudentDialog;

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative -ms-px flex size-9 items-center justify-center border border-input font-medium text-foreground shadow-sm shadow-black/5 transition-shadow first:ms-0 first:rounded-s-lg last:rounded-e-lg",
        { "z-10 border border-ring ring-[3px] ring-ring/20": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
