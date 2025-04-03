"use client"

import UseTheme from "@/context/theme/use-theme";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"

interface props {
children : React.ReactNode,
lang : Locale
}
const AuthLayoutChildren = ({children,lang} : props) => {
    const pathname = usePathname();
    const isOnboardingPage = pathname === `/${lang}/auth/onboarding`;
  return (
    <main data-theme={UseTheme()} className={cn("min-w-[50%] absolute right-0" , isOnboardingPage && "w-2/3")}>
      {children}
    </main>
  )
}

export default AuthLayoutChildren
