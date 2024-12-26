import AuthChangeTheme from "@/components/auth/nav/auth-theme";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <section className=" bg-grid-md">
      <AuthChangeTheme />{" "}
      <div className=" items-center justify-center flex min-h-screen w-full">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
