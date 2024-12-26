"use client"
import AuthLogo from "@/components/auth/auth-logo";
import { LoginForm } from "@/components/auth/forms/login-form";
import MyImage from "@/components/my-components/myImage";

const Page = () => {
  return (
    <div className="w-full justify-center flex">
      <div className=" p-4 gap-4">
        <AuthLogo />
        <LoginForm />
        <span className="justify-center flex items-center text-sm font-semibold text-wrap">
          Providers
        </span>
        <div>
          <button className="btn w-full btn-neutral">
            <MyImage
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              className="size-6"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
