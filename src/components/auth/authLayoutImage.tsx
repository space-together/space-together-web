"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";

import UseTheme from "@/context/theme/use-theme";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n";
import { leftSideDictionType } from "@/locale/types/authDictionTypes";
import MyImage from "../my-components/myImage";
import SiteLogo from "../site/navbar/site-logo";

interface AuthLayoutImageProps {
  lang: Locale;
  diction: leftSideDictionType;
}

const SentenceBreaker = ({ sentence }: { sentence: string }) => {
  return (
    <p className="happy-title-base text-3xl font-smallAndBig text-white text-center">
      {sentence.split(",").map((part, index, arr) => (
        <React.Fragment key={index}>
          {part.trim()}
          {index < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  );
};

const AuthLayoutImage: React.FC<AuthLayoutImageProps> = ({ lang, diction }) => {
  const theme = UseTheme();
  const pathname = usePathname();
  const isRegisterPage = pathname === `/${lang}/auth/register`;
  const isOnboardingPage = pathname === `/${lang}/auth/onboarding`;
  
  return (
    <div className={cn("w-1/2 h-screen fixed", isOnboardingPage && "w-1/3")}>
      {/* Header */}
      <div className={cn("absolute top-0 z-50 flex w-full justify-between m-2 items-center", theme && "text-white")}>        
        <div className="p-2">
          <SiteLogo lang={lang} />
        </div>
        <Link
          href={`/${lang}/`}
          className={cn(
            "btn btn-sm group mr-4 btn-ghost backdrop-blur-lg bg-white/10",
            theme === "dark" && "hover:bg-black/30"
          )}
        >
          {diction.goBack}
          <GrLinkNext className="group-hover:scale-x-125 duration-300" />
        </Link>
      </div>
      
      {/* Background Image */}
      <div className="w-full h-full relative">
        <MyImage
          src={cn(
            `/images/${isOnboardingPage ? 15 : 11}.jpg` || 
            "https://img.freepik.com/free-photo/college-students-different-ethnicities-cramming_23-2149891296.jpg"
          )}
          alt="Background Image"
          className="h-full w-full"
        />
        
        {theme === "dark" && <div className="absolute w-full top-0 bg-black/20 z-10 h-screen" />}
        
        {/* Gradient Overlay & Content */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent h-1/4 z-10">
          <div className="w-full relative mt-4">
            {isRegisterPage && (
              <div className="text-center">
                <SentenceBreaker sentence={diction.spaceTogether} />
                <ProgressIndicators activeIndex={0} />
              </div>
            )}
            {isOnboardingPage && (
              <div className="text-center">
                <SentenceBreaker sentence={diction.onboarding.description} />
                <ProgressIndicators activeIndex={1} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressIndicators = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="flex justify-center mt-8 gap-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            "h-1 w-1/12 backdrop-blur-lg rounded-full",
            index === activeIndex ? "bg-white" : "bg-white/40"
          )}
        />
      ))}
    </div>
  );
};

export default AuthLayoutImage;
