"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { i18n, Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import UseTheme from "@/context/theme/use-theme";

interface Props {
  lang: Locale;
}

export const AuthChangeLanguages = ({ lang }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = UseTheme();
  const [selectedLang, setSelectedLang] = useState<Locale>(lang);

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleSave = () => {
    router.push(redirectedPathName(selectedLang));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className=" w-full">Change language</AlertDialogTrigger>
      <AlertDialogContent data-theme={theme}>
        <AlertDialogHeader>
          <AlertDialogTitle className=" flex gap-2 items-center">
            <Languages size={20} className="text-neutral" />
          </AlertDialogTitle>
          <div className="flex flex-col gap-2 justify-start items-start">
            {i18n.locales.map((locale) => (
              <label
                key={locale}
                className="label cursor-pointer justify-start gap-2"
              >
                <input
                  type="radio"
                  name="language"
                  className={cn(
                    "radio size-5",
                    selectedLang === locale &&
                      "checkbox-neutral checked:bg-neutral-content"
                  )}
                  checked={selectedLang === locale}
                  onChange={() => setSelectedLang(locale)}
                />
                <span className="label-text">
                  {locale === "en" ? "English" : "Kinyarwanda"}
                </span>
              </label>
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" capitalize">Cancel</AlertDialogCancel>
          <AlertDialogAction className={cn("capitalize")} onClick={handleSave}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
