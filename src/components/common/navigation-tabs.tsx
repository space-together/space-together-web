"use client";

import MyLink from "@/components/common/myLink";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import MyImage from "./myImage";

export interface NavigationTab {
  name: string;
  href: string;
  icon?: React.ComponentType<{ size?: number }>;
  image?: string;
  className?: string;
}

interface NavigationTabsProps {
  items: NavigationTab[];
  className?: string;
}

const normalize = (p: string) => p.replace(/\/$/, ""); // remove trailing slash

const NavigationTabs = ({ items, className }: NavigationTabsProps) => {
  const pathname = usePathname() ?? "/";
  const cleanPath = normalize(pathname);

  // compute match length for each item (0 = no match)
  const matchLengths = items.map((it) => {
    const h = normalize(it.href);
    if (cleanPath === h) return h.length; // exact match
    if (cleanPath.startsWith(h + "/")) return h.length; // child route
    return 0;
  });

  // get the maximum match length (if 0 => nothing matched)
  const maxMatch = Math.max(...matchLengths, 0);

  return (
    <nav
      className={cn(
        "w-full gap-8 flex flex-row flex-wrap border-b border-base-content/50 sticky bg-base-300/50 backdrop-blur-md z-30 top-0",
        className,
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isActive =
          matchLengths[idx] > 0 && matchLengths[idx] === maxMatch;

        return (
          <MyLink
            key={item.name}
            loading
            className={cn(
              `capitalize py-1 ${isActive ? "border-b-3 border-b-primary" : ""}`,
              item.className,
            )}
            href={item.href}
            button={{ variant: "ghost" }}
          >
            <div className="flex items-center gap-1">
              {item.image && <MyImage src={item.image} role="ICON" />}
              {Icon && <Icon size={16} />}
              <span className="capitalize">{item.name}</span>
            </div>
          </MyLink>
        );
      })}
    </nav>
  );
};

export default NavigationTabs;
