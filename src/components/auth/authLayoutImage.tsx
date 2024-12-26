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
      <div
        className={cn(
          "absolute top-0 items-center z-10 m-2 flex justify-between w-full",
          theme && "text-white"
        )}
      >
        <div className={cn("btn rounded-full btn-ghost backdrop-blur-lg")}>
          <AuthLogo />
        </div>
        <Link
          className={cn(
            "btn rounded-full mr-4 btn-ghost backdrop-blur-lg",
            theme === "dark" && "hover:bg-black/30"
          )}
          href={`/`}
        >
          Back to website <GrLinkNext />
        </Link>
      </div>
      <div className=" w-full h-full relative">
        <MyImage
          src="/images/9.jpg"
          alt="Picture of the author"
          className="  h-full w-full"
        />
        {theme === "dark" && (
          <div className=" absolute w-full top-0 bg-black/20 z-10 h-screen" />
        )}
        <div className=" absolute w-full bottom-0 bg-gradient-to-t from-black to-transparent h-1/3 z-10">
          <div className=" h-full w-full relative">
            {pathname === "/auth/register" && (
              <div>
                <h4 className=" happy-title-base text-2xl">Together in Learning, Together in success</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutImage;
