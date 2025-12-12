"use client";

import NavigationTabs from "@/components/common/navigation-tabs";
import type { Locale } from "@/i18n";
import { BookA } from "lucide-react";
import { BsShield } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";

const SchoolSettingsNav = ({ lang }: { lang: Locale }) => {
  const pages = [
    {
      name: "Public information",
      icon: RxActivityLog,
      href: `/${lang}/s-t/settings`,
    },
    {
      name: "Education",
      icon: BookA,
      href: `/${lang}/s-t/settings/education`,
    },
    {
      name: "Security",
      icon: BsShield,
      href: `/${lang}/s-t/settings/security`,
    },
  ];

  return <NavigationTabs items={pages} />;
};

export default SchoolSettingsNav;
