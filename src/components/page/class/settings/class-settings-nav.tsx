import type { NavigationTab } from "@/components/common/navigation-tabs";
import NavigationTabs from "@/components/common/navigation-tabs";
import type { Locale } from "@/i18n";

interface ClassSettingsNavProps {
  lang: Locale;
  classUsername: string;
}

const ClassSettingsNav = ({ lang, classUsername }: ClassSettingsNavProps) => {
  const pages: NavigationTab[] = [
    {
      name: "general",
      image: "/icons/classroom.png",
      href: `/${lang}/c/${classUsername}/settings`,
    },
    {
      name: "students",
      image: "/icons/students.png",
      href: `/${lang}/c/${classUsername}/settings/students`,
    },
    {
      name: "teachers",
      image: "/icons/training.png",
      href: `/${lang}/c/${classUsername}/settings/teachers`,
    },
    {
      name: "class-teacher",
      image: "/icons/teacher.png",
      href: `/${lang}/c/${classUsername}/settings/class-teacher`,
    },
    {
      name: "subjects",
      image: "/icons/books.png",
      href: `/${lang}/c/${classUsername}/settings/subjects`,
    },
    {
      name: "timetable",
      image: "/icons/timetable.png",
      href: `/${lang}/c/${classUsername}/settings/timetable`,
    },
  ] as const;

  return <NavigationTabs items={pages} />;
};

export default ClassSettingsNav;
