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
import { useId as user_id, useTransition } from "react";
import Link from "next/link";
import { Locale } from "@/i18n";
import { useRouter } from "next/navigation";

interface props {
  isOpen: boolean;
  userId: string;
  lang: Locale;
}
const IsTeacherDialog = ({ isOpen, lang }: props) => {
    const [isPending , startTransition] = useTransition()
    const router = useRouter();
    const handleCreateClass = () => {
        startTransition(() => {
          router.push(`/${lang}/class/add`)
        })
      }    
  const id = user_id();
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent data-theme={UseTheme()} className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you have school or class code?</AlertDialogTitle>
          <AlertDialogDescription>
            Code you given by school or class which by schools if you you are private tutors you can <Link href={`/${lang}/class/add`} className=" link">create new class</Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" space-y-2">
          <div className="space-y-2">
            <Label htmlFor={id}>School Code</Label>
            <OTPInput
              id={id}
              containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
              maxLength={6}
              disabled={isPending}
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
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => handleCreateClass()}>Create class</AlertDialogCancel>
          <AlertDialogAction disabled={isPending}>Use Code</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IsTeacherDialog;

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
