"use client";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import AppLogo from "@/components/page/application/navbar/app-logo";
import type { Locale } from "@/i18n";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { type JSX } from "react";
import { GrLinkNext } from "react-icons/gr";

interface props {
  lang: Locale;
  diction: any;
}

const AuthLayoutImage = ({ lang, diction }: props) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  const SentenceBreaker = (sentence: string): JSX.Element => {
    const splitSentence = sentence.split(",").map((part, index) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < sentence.split(",").length - 1 && <br />}
      </React.Fragment>
    ));

    return (
      <p className=" font-semibold text-2xl text-base-content text-center">
        {splitSentence}
      </p>
    );
  };

  const isOnboarding = new RegExp(`^/${lang}/auth/onboarding`).test(pathname);

  return (
    <div className={cn("w-1/2 h-screen sticky", isOnboarding && " w-1/3")}>
      <div
        className={cn(
          "absolute z-50 top-0 items-center m-2 flex justify-between w-full ",
        )}
      >
        <div className={cn(" p-2")}>
          <AppLogo lang={lang} />
        </div>
        <MyLink
          className={cn(
            "btn btn-sm group mr-4 z- btn-ghost backdrop-blur-lg bg-white/10 hidden",
          )}
          href={`/${lang}/`}
        >
          {diction.goBack}
          <GrLinkNext className="group/toHome duration-300 group-hover:scale-x-125" />
        </MyLink>
      </div>
      <div className=" w-full h-full relative flex flex-col justify-between  pt-16">
        <div className=" justify-center items-center flex">

        <MyImage
          src={cn("/png/book-and-pen.png")}
          alt="Book and Pen"
          className="size-80"
        />
        </div>
        <div className="  h-1/4 z-10">
          <div className=" w-full relative mt-4">
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
            {pathname === `/${lang}/auth/onboarding` && (
              <div className=" ">
                {SentenceBreaker(diction.onboarding.description)}
                <div className="  flex justify-center mt-8 gap-2">
                  <div className=" h-1 w-1/12 bg-white backdrop-blur-lg rounded-full" />
                  <div className=" h-1 w-[12%] bg-white backdrop-blur-lg rounded-full" />
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
