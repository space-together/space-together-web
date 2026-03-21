"use client";

import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/i18n";
import { MenuIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { allPages } from "./landing-nav-all-pages";

interface LandingNavMobileProps {
  lang: Locale;
}

export default function LandingNavMobile({ lang }: LandingNavMobileProps) {
  const [open, setOpen] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof allPages>();
    for (const page of allPages) {
      const list = map.get(page.category) ?? [];
      list.push(page);
      map.set(page.category, list);
    }
    return map;
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          library="shadcn"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto pb-4">
          {[...grouped.entries()].map(([category, pages]) => (
            <div key={category} className="flex flex-col gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wide opacity-70">
                {category}
              </Label>
              <ul className="flex flex-col gap-1">
                {pages.map((page) => (
                  <li key={`${category}-${page.href}-${page.label}`}>
                    <MyLink
                      href={`/${lang}${page.href}`}
                      className="text-base-content hover:text-primary block rounded-md px-2 py-2 text-sm transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {page.label}
                    </MyLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-base-content/10 flex flex-col gap-2 border-t pt-4 sm:hidden">
          <Button
            variant="ghost"
            library="daisy"
            size="sm"
            href={`/${lang}/auth/login`}
            onClick={() => setOpen(false)}
          >
            Sign in
          </Button>
          <Button
            variant="primary"
            library="daisy"
            size="sm"
            href={`/${lang}/auth/register`}
            onClick={() => setOpen(false)}
          >
            Get started
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
