"use client";
import UseTheme from "@/context/theme/use-theme";
import { GrLinkNext } from "react-icons/gr";
// import { usePathname } from "next/navigation";
import MyImage from "../my-components/myImage";
import AuthLogo from "./auth-logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AuthLayoutImage = () => {
  const theme = UseTheme();
//   const pathname = usePathname();

  return (
    <div className=" w-1/2 h-screen relative">
      <div className={cn("absolute top-0 items-center z-10 m-2 flex justify-between w-full", theme && "text-white")}>
        <div className={cn("p-2 rounded-full backdrop-blur-lg ")}>
          <AuthLogo />
        </div>
        <Link className={cn("mr-4 flex items-center gap-2 rounded-full backdrop-blur-lg p-3" , theme === "dark" && "hover:bg-black/30")} href={`/`}>
          Back to website <GrLinkNext />
        </Link>
      </div>
      <div className=" w-full h-full relative">
        <MyImage
          src="/images/7.jpg"
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
