"use client";

import { BsGearWide, BsPalette } from "react-icons/bs";
import { IoLanguageSharp } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

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
import { i18n, Locale } from "@/i18n";
import UseTheme from "@/context/theme/use-theme";
import { AuthSettingDictionType } from "@/locale/types/authDictionTypes";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/theme/themeProviders";
import MyImage from "@/components/my-components/myImage";
import { cn } from "@/lib/utils";

interface props {
  lang: Locale;
  diction: AuthSettingDictionType;
}

const AuthSetting = ({ lang, diction }: props) => {
  const theme = UseTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { changeTheme } = useContext(ThemeContext)!;

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

  const handleThemeChange = (e : string) => {
    changeTheme(e);
  };

  const mainTheme = ["dark", "light"];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          shape="circle"
          className=" absolute right-2 top-2 btn-square btn-circle"
        >
          <BsGearWide size={24} />
          <span className=" sr-only">auth setting</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-theme={theme}>
        <AlertDialogHeader>
          <AlertDialogTitle>{diction.dialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {diction.dialog.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" flex flex-col gap-1">
          {/* language */}
          <div className="">
            <div className=" flex gap-2 items-center">
              <IoLanguageSharp />
              <h4 className=" happy-title-base text-base">
                {diction.dialog.language.title}
              </h4>
            </div>
            <div className=" happy-line gap-1">
              {i18n.locales.map((locale) => (
                <label
                  key={locale}
                  htmlFor={locale}
                  className=" btn btn-sm btn-ghost justify-between"
                >
                  <div className=" flex items-center gap-2">
                    <input
                      className=" size-4 radio radio-info radio-sm"
                      value={locale}
                      name="language"
                      checked={selectedLang === locale}
                      id={locale}
                      type="radio"
                      onChange={() => setSelectedLang(locale)}
                    />
                    {locale === "kiny" ? (
                      <span>{diction.dialog.language.kiny}</span>
                    ) : (
                      <span>{diction.dialog.language.en}</span>
                    )}
                  </div>
                  <MyImage
                    src={`/icons/${
                      locale === "kiny" ? "rwanda" : "english"
                    }.png`}
                    className=" size-4"
                  />
                </label>
              ))}
            </div>
          </div>
          {/* theme */}
          <div className="">
            <div className=" flex gap-2 items-center">
              <BsPalette />
              <h4 className=" happy-title-base text-base">
                {diction.dialog.theme.title}
              </h4>
            </div>
            <div className=" happy-line gap-1">
              {mainTheme.map((t) => (
                <Button
                  className=" justify-between"
                  onClick={() => handleThemeChange(t)}
                  key={t}
                  size="sm"
                  variant="ghost"
                >
                  <span className={cn(" capitalize" , theme === t && "text-info")}>{t}</span>
                  <MyImage
                    src={`/icons/${
                      t === "dark" ? "moon" : "sun"
                    }.png`}
                    className=" size-4"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className=" capitalize">
            {diction.dialog.button.cancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} className=" capitalize">
            {diction.dialog.button.save}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthSetting;
