"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileButton from "./profile-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarGroupsProps } from "@/utils/context/app-side-content";
import { Separator } from "@/components/ui/separator";
import MyImage from "@/components/my-components/myImage";
import { Locale } from "@/i18n";
import { authUser } from "@/types/userModel";
import UseTheme from "@/context/theme/use-theme";
import { ReactNode } from "react";

// Reusable component for rendering sidebar groups
const SidebarGroupComponent = ({
  label,
  items,
  index,
  lang,
  otherData1,
}: sidebarGroupsProps) => {
  const path = usePathname();
  const theme = UseTheme();
  return (
    <SidebarGroup className=" p-0">
      <div>
        {label ? (
          <span className=" font-medium text-xs text-myGray ml-2">{label}</span>
        ) : (
          <div>
            {index == 0 ? (
              <div className=" mt-2"></div>
            ) : (
              <Separator className="mb-2" />
            )}
          </div>
        )}
      </div>
      <SidebarGroupContent>
        <SidebarMenu className=" space-y-1 pr-2">
          {items.map((item, index) => {
            if (item.otherData1)
              return (
                <Accordion
                  type="single"
                  collapsible
                  key={index}
                  className="group/accordion"
                >
                  <AccordionItem value={item.title}>
                    <SidebarMenuItem>
                      <AccordionTrigger className="hover:no-underline btn btn-sm btn-ghost py-0 rounded-l-none">
                        {item.url ? (
                          <Link
                            href={cn(lang ? `/${lang}${item.url}` : item.url)}
                            className={cn(
                              "flex items-center gap-2 font-normal rounded-l-none",
                              path === item.url ||
                                (path === `/${lang}${item.url}` &&
                                  `bg-base-300 ${
                                    theme === "dark" && "bg-white/10"
                                  }`)
                            )}
                          >
                            {item.icon && <item.icon className="size-6" />}
                            {item.image && (
                              <MyImage className=" size-6" src={item.image} />
                            )}
                            {item.title}
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 font-normal">
                            {item.icon && <item.icon className="size-6" />}
                            {item.image && (
                              <MyImage className=" size-6" src={item.image} />
                            )}
                            {item.title}
                          </div>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <SidebarMenuSub>
                          {otherData1}
                        </SidebarMenuSub>
                      </AccordionContent>
                    </SidebarMenuItem>
                  </AccordionItem>
                </Accordion>
              );
            return item.children ? (
              <Accordion
                type="single"
                collapsible
                key={index}
                className="group/accordion"
              >
                <AccordionItem value={item.title}>
                  <SidebarMenuItem>
                    <AccordionTrigger className="hover:no-underline btn btn-sm btn-ghost py-0">
                      <span className="flex items-center gap-2">
                        {item.icon && <item.icon className=" size-6" />}
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SidebarMenuSub>
                        {item.children.map((subItem, subIndex) => (
                          <SidebarMenuSubItem key={subIndex}>
                            {subItem.url ? (
                              <Link
                                href={
                                  lang
                                    ? `/${lang}${subItem.url}`
                                    : `${subItem.url}`
                                }
                                className={cn(
                                  "ml-8 flex items-center gap-2 btn-xs btn-ghost  rounded-md",
                                  path === subItem.url ||
                                    (path === `/${lang}${subItem.url}` &&
                                      "btn-info")
                                )}
                              >
                                {subItem.icon && (
                                  <subItem.icon className=" size-5" />
                                )}
                                {subItem.title}
                              </Link>
                            ) : (
                              <button className="ml-8 flex items-center gap-2 btn-xs btn-ghost  rounded-md">
                                {subItem.icon && (
                                  <subItem.icon className=" size-5" />
                                )}
                                {subItem.title}
                              </button>
                            )}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </AccordionContent>
                  </SidebarMenuItem>
                </AccordionItem>
              </Accordion>
            ) : (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  {item.url ? (
                    <Link
                      href={cn(lang ? `/${lang}${item.url}` : item.url)}
                      className={cn(
                        "flex items-center gap-2 font-normal rounded-l-none border-r-2",
                        path === item.url ||
                          (path === `/${lang}${item.url}` &&
                            `bg-base-300 ${theme === "dark" && "bg-white/10"}`)
                      )}
                    >
                      {item.icon && <item.icon className="size-6" />}
                      {item.image && (
                        <MyImage className=" size-6" src={item.image} />
                      )}
                      {item.title}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 font-normal">
                      {item.icon && <item.icon className="size-6" />}
                      {item.image && (
                        <MyImage className=" size-6" src={item.image} />
                      )}
                      {item.title}
                    </div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

interface props {
  items: sidebarGroupsProps[];
  lang?: Locale;
  user?: authUser;
  otherData1?: ReactNode[];
}

export function AppSidebar({ items, lang, user, otherData1 }: props) {
  return (
    <Sidebar className=" pt-14">
      <SidebarContent className=" border-r shrink-0 border-border">
        <div className=" overflow-y-auto max-h-[calc(100vh-5.5rem) space-y-1">
          {items.map((group, index) => (
            <SidebarGroupComponent
              key={index}
              label={group.label}
              items={group.items}
              index={index}
              lang={lang}
              otherData1={otherData1}
            />
          ))}
          <div className="h-[1.5rem]]" />
        </div>
        <SidebarFooter className=" fixed bottom-0 from-base-300 via-base-300  to-transparent h-20 w-[16rem] ">
          <div className=" flex justify-between items-center ">
            <div className="flex  items-center space-x-1 pt-6">
              <Avatar>
                <AvatarImage src={user?.image ? user.image : "/images/2.jpg"} />
                <AvatarFallback>CEO</AvatarFallback>
              </Avatar>
              <div className=" flex flex-col">
                <h6 className="text-sm font-medium">{user?.name}</h6>
                <span className=" my-sm-text">{user?.role}</span>
              </div>
            </div>
            <ProfileButton />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
