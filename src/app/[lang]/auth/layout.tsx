import AuthLayoutContent from "@/components/page/auth/auth-layout-content";
import AuthLayoutImage from "@/components/page/auth/auth-layout-images";
import { getDictionary, type Locale } from "@/i18n";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}
const AuthLayout = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const diction = await getDictionary(lang as Locale);
  return (
    <main className=" flex  w-full  px-20">
        <AuthLayoutImage
          diction={diction.auth.leftSide}
          lang={lang as Locale}
        />
      <AuthLayoutContent diction={diction.auth.setting} lang={lang as Locale}>
        {children}
      </AuthLayoutContent>
    </main>
  );
};

export default AuthLayout;
