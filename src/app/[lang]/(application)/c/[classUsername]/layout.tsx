import ClassNavbar from "@/components/page/class/class-navbar";
import type { Locale } from "@/i18n";


const ClassLayout = async (props: LayoutProps<"/[lang]/c/[classUsername]">) => {
  const { lang, classUsername } = await props.params;
  return (
    <div className="">
      <ClassNavbar classUsername={classUsername} lang={lang as Locale} />
      {props.children}
    </div>
  );
};

export default ClassLayout;
