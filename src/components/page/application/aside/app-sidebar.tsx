"use client";

import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { Locale } from "@/i18n";
import { isActivePath } from "@/lib/helpers/link-is-active";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AppNavLogo from "../navbar/app-nav-logo";
import type { sidebarGroupsProps } from "./app-side-content";

interface AppSidebarProps {
  items: sidebarGroupsProps[];
  lang: Locale;
  auth: AuthContext;
}

export function AppSidebar({ items, lang, auth }: AppSidebarProps) {
  const path = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar
      className={cn(
        "bg-base-200 gap-0 space-y-0 pl-0 border-l-0 ",
        open && "border-base-200",
      )}
      collapsible="icon"
    >
      <SidebarHeader className=" p-0 bg-base-200">
        <AppNavLogo lang={lang} auth={auth} />
      </SidebarHeader>
      <SidebarContent className="bg-base-200 text-on-primary gap-0 pl-0 scrollbar  scrollbar-thumb-base-content/20 scrollbar-track-base-200 hover:scrollbar-thumb-base-content/20 appearance-none  no-scroll-arrows">
        {items.map((group) => (
          <SidebarGroup
            className="pl-0"
            key={group.label ?? group.items[0]?.title ?? Math.random()}
          >
            {group.label && (
              <SidebarGroupLabel className=" text-sm font-medium text-base-content/50">
                {group.label}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url ?? item.title}>
                    {item.children ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={item.url ?? item.title}>
                          <AccordionTrigger
                            className={cn(
                              buttonVariants({
                                variant: "ghost",
                                library: "daisy",
                              }),
                              isActivePath(path, item.url, lang) &&
                                `bg-base-300`,
                              "hover:bg-base-100 w-full justify-between",
                              // "[&[data-state=open]>svg]:opacity-0 [&[data-state=open]>svg]:pointer-events-none",
                              !open && "[&>svg]:hidden",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && (
                                <Image
                                  src={item.icon}
                                  alt={item.title}
                                  width={20}
                                  height={20}
                                  className="h-5 min-h-5 w-5 min-w-5"
                                />
                              )}
                              {open && (
                                <span className="text-base-content">
                                  {item.title}
                                </span>
                              )}
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className=" pb-0">
                            <SidebarMenuSub>
                              {item.children.map((subItem) => (
                                <SidebarMenuSubItem
                                  key={subItem.url ?? subItem.title}
                                  className={cn(
                                    buttonVariants({
                                      variant: "ghost",
                                      size: "sm",
                                      library: "daisy",
                                    }),
                                    isActivePath(path, subItem.url, lang) &&
                                      "bg-base-content/10",
                                    " ml-0  justify-start hover:bg-base-100",
                                  )}
                                >
                                  <MyLink
                                    href={subItem.url || "/"}
                                    className="flex w-full items-center justify-between"
                                  >
                                    <div className="flex items-center gap-2">
                                      {subItem.icon && (
                                        <Image
                                          src={subItem.icon}
                                          alt={subItem.title}
                                          width={20}
                                          height={20}
                                          className="h-5 min-h-5 w-5 min-w-5"
                                        />
                                      )}
                                      <LoadingIndicatorText
                                        title={subItem.title}
                                      >
                                        {subItem.title}
                                      </LoadingIndicatorText>
                                    </div>
                                  </MyLink>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <SidebarMenuButton asChild className=" pl-2">
                        <MyLink
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              library: "daisy",
                            }),
                            isActivePath(path, item.url, lang) &&
                              `bg-base-content/10`,
                            "hover:bg-base-100 justify-between rounded-l-none ",
                          )}
                          href={item.url || "/"}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && (
                              <Image
                                src={item.icon}
                                alt={item.title}
                                width={20}
                                height={20}
                                className="h-5 min-h-5 w-5 min-w-5"
                              />
                            )}
                            <LoadingIndicatorText title={item.title}>
                              {item.title}
                            </LoadingIndicatorText>
                          </div>
                        </MyLink>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/*<SidebarFooter className="bg-base-200 text-on-primary dark:bg-surface-container dark:text-on-surface">*/}
      {/* add theme */}
      {/*</SidebarFooter>*/}
    </Sidebar>
  );
}
