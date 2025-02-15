"use client";
import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { BsCheck2Circle } from "react-icons/bs";

interface props {
  lang: Locale;
}

type langProps = {
  username: Locale;
  name: string;
  image: string;
};

const SettingLang = ({ lang }: props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLang = (l: Locale) => {
    startTransition(() => router.push(redirectedPathName(l)));
  };

  const languages: langProps[] = [
    {
      name: "Kinyarwanda",
      username: "rw",
      image: "/icons/rwanda.png",
    },
    {
      name: "English",
      username: "en",
      image: "/icons/english.png",
    },
  ];

  return (
    <div className=" happy-card">
      <div>
        <h2 className=" happy-title-base">Language settings</h2>
        <p>
          Application language we support, change system language by click them,
          it can take few second to change{" "}
        </p>
      </div>
      <div className=" space-y-2 mt-4">
        {languages.map((item, index) => (
          <Button
            key={index}
            className=" w-full justify-between"
            onClick={() => handleLang(item.username)}
            variant="ghost"
            size="sm"
          >
            <div className=" flex space-x-2 items-center">
              <MyImage role="ICON" src={item.image} />
              <span className=" capitalize">{item.name}</span>
            </div>
            {isPending ? (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            ) : (
              lang === item.username && (
                <BsCheck2Circle size={20} className=" text-info" />
              )
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SettingLang;
