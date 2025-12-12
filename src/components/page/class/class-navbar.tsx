"use client";

import NavigationTabs from "@/components/common/navigation-tabs";
import type { Locale } from "@/i18n";

interface Props {
  lang: Locale;
  classUsername: string;
}

const ClassNavbar = ({ lang, classUsername }: Props) => {
  const pages = [
    { name: "overview", href: `/${lang}/c/${classUsername}` },
    { name: "subjects", href: `/${lang}/c/${classUsername}/subjects` },
    { name: "discussion", href: `/${lang}/c/${classUsername}/discussion` },
    { name: "classwork", href: `/${lang}/c/${classUsername}/classwork` },
    { name: "people", href: `/${lang}/c/${classUsername}/people` },
    { name: "timetable", href: `/${lang}/c/${classUsername}/timetable` },
    { name: "settings", href: `/${lang}/c/${classUsername}/settings` },
  ];

  return <NavigationTabs items={pages} />;
};

export default ClassNavbar;
