"use client";
import UseTheme from "@/context/theme/use-theme";
import { GrLinkNext } from "react-icons/gr";
import { usePathname } from "next/navigation";
import MyImage from "../my-components/myImage";
import AuthLogo from "./auth-logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AuthLayoutImage = () => {
  const theme = UseTheme();
  const pathname = usePathname();

  return (
    <div className=" w-1/2 h-screen relative">
      <div className={cn("absolute top-0 items-center z-10 m-2 flex justify-between w-full", theme && "text-white")}>
        <div className={cn("p-2 rounded-full backdrop-blur-lg ")}>
          <AuthLogo />
        </div>
        <Link className={cn("mr-4 flex items-center gap-2 rounded-full backdrop-blur-lg p-3 cupo" , theme === "dark" && "hover:bg-black/30")} href={`/`}>
          Back to website <GrLinkNext />
        </Link>
      </div>
      <div className=" w-full h-full relative">
        <MyImage
          src="https://img.freepik.com/free-photo/girl-studying-university-library_23-2148844686.jpg?t=st=1735179684~exp=1735183284~hmac=f0adc36ca0e306488c48df58038016f3876f5d1ce9d44274b6b1d251c3bb1b7e&w=996"
          alt="Picture of the author"
          className="  h-full w-full"
        />
        {theme === "dark" && (
          <div className=" absolute w-full top-0 bg-black/20 z-10 h-screen" />
        )}
      </div>
    </div>
  );
};

export default AuthLayoutImage;
