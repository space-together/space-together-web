"use client";

import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AppLayoutClientBodyProps {
  children: React.ReactNode;
  lang: Locale
}

const AppLayoutClientBody = ({ children, lang }: AppLayoutClientBodyProps) => {
  const pathname = usePathname()
  const hiddenPrefixes = [
    `/${lang}/messages`,
  ];

  const isOnPage = hiddenPrefixes.some(prefix => pathname.startsWith(prefix))

  return (
    <main className={cn("min-h-screen w-full pt-14 px-8", isOnPage && "px-0")}>
{children}
    </main>
  );
};

export default AppLayoutClientBody;
