"use client";

import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AppLayoutClientBodyProps {
  children: React.ReactNode;
  lang: Locale;
}

const AppLayoutClientBody = ({ children, lang }: AppLayoutClientBodyProps) => {
  const pathname = usePathname();
  const hiddenPrefixes = [`/${lang}/m`];

  const isOnPage = hiddenPrefixes.some((prefix) => pathname.startsWith(prefix));

  const noGap = [`/${lang}/c`, `/${lang}/p`, `/${lang}/school`, `/${lang}/m`];

  const noGapPath = noGap.some((prefix) => pathname.startsWith(prefix));

  return (
    <main
      className={cn(
        "min-h-screen w-full pt-8 px-8 flex flex-col gap-4",
        isOnPage && "px-0 gap-0",
        noGapPath && "gap-0",
      )}
    >
      {children}
    </main>
  );
};

export default AppLayoutClientBody;
