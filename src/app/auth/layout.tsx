import AuthLayoutImage from "@/components/auth/authLayoutImage";
import AuthChangeTheme from "@/components/auth/nav/auth-theme";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <section className=" bg-base-300">
      <AuthChangeTheme />
      <div className=" items-center justify-between flex min-h-screen w-full ">
      <AuthLayoutImage />
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
