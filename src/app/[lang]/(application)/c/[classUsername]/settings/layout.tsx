import ClassSettingsNav from "@/components/page/class/settings/class-settings-nav";
import type { Locale } from "@/i18n";

const ClassLayoutPage = async (
  props: LayoutProps<"/[lang]/c/[classUsername]/settings">,
) => {
  const params = await props.params;

  return (
    <div className=" flex-col flex gap-4 w-full px-8">
      <ClassSettingsNav
        classUsername={params.classUsername}
        lang={params.lang as Locale}
      />
      <div className=" min-h-screen pt-2 w-full ">{props.children}</div>
    </div>
  );
};

export default ClassLayoutPage;
