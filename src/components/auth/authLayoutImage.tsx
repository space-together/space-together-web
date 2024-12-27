"use client";
import UseTheme from "@/context/theme/use-theme";
import { GrLinkNext } from "react-icons/gr";
import { usePathname } from "next/navigation";
import MyImage from "../my-components/myImage";
import AuthLogo from "./auth-logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Locale } from "@/i18n";
import { leftSideDictionType } from "@/locale/types/authDictionTypes";
import React from "react";

interface props {
  lang: Locale;
  diction: leftSideDictionType;
}

const AuthLayoutImage = ({ lang, diction }: props) => {
  const theme = UseTheme();
  const pathname = usePathname();

  const SentenceBreaker = (sentence: string): JSX.Element => {
    const splitSentence = sentence.split(",").map((part, index) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < sentence.split(",").length - 1 && (
          <>
            ,<br />
          </>
        )}
      </React.Fragment>
    ));

    return (
      <p className="happy-title-base text-3xl font-smallAndBig text-white text-center">
        {splitSentence}
      </p>
    );
  };
  return (
    <div className=" w-1/2 h-screen relative">
      <div
        className={cn(
          "absolute top-0 items-center z-10 m-2 flex justify-between w-full",
          theme && "text-white"
        )}
      >
        <div className={cn(" p-2")}>
          <AuthLogo />
        </div>
        <Link
          className={cn(
            "btn btn-sm group mr-4 btn-ghost backdrop-blur-lg bg-white/10",
            theme === "dark" && "hover:bg-black/30"
          )}
          href={`/`}
        >
          {diction.goBack}
          <GrLinkNext className="group/toHome duration-300 group-hover:scale-x-125" />
        </Link>
      </div>
      <div className=" w-full h-full relative">
        <MyImage
          src="/images/8.jpg"
          alt="Picture of the author"
          className="  h-full w-full"
        />
        {theme === "dark" && (
          <div className=" absolute w-full top-0 bg-black/20 z-10 h-screen" />
        )}
        <div className=" absolute w-full bottom-0 bg-gradient-to-t from-black to-transparent h-1/4 z-10">
          <div className=" h-full w-full relative mt-4">
            {pathname === `/${lang}/auth/register` && (
              <div className=" ">
                {SentenceBreaker(diction.spaceTogether)}
                <div className="  flex justify-center mt-8 gap-2">
                  <div className=" h-1 w-[12%] bg-white backdrop-blur-lg rounded-full" />
                  <div className=" h-1 w-1/12 bg-white/40 backdrop-blur-lg rounded-full" />
                  <div className=" h-1 w-1/12 bg-white/40 backdrop-blur-lg rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutImage;
