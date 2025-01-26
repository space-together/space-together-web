"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
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
import SiteLogo from "./site-logo";
import AuthChangeTheme from "@/components/auth/nav/auth-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileButton from "./profile-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarGroupsProps } from "@/utils/context/app-side-content";
import { Separator } from "@/components/ui/separator";
import MyImage from "@/components/my-components/myImage";

// Reusable component for rendering sidebar groups
const SidebarGroupComponent = ({ label, items, index }: sidebarGroupsProps) => {
  const path = usePathname();
  return (
    <SidebarGroup className=" p-0">
      <div>
        {label ? (
          <>{label}</>
        ) : (
          <div>
            {index == 0 ? <div className=" mt-2"></div> : <Separator />}
          </div>
        )}
      </div>
      <SidebarGroupContent>
        <SidebarMenu className=" space-y-2 pr-2">
          {items.map((item, index) =>
            item.children ? (
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
                                href={subItem.url}
                                className={cn(
                                  "ml-8 flex items-center gap-2 btn-xs btn-ghost  rounded-md",
                                  path === subItem.url && "btn-info"
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
                      href={item.url}
                      className={cn(
                        "flex items-center gap-2 font-normal",
                        path === item.url && "text-info"
                      )}
                    >
                      {item.icon && <item.icon className="size-6" />}
                      {item.image && <MyImage className=" size-6" src={item.image}/>}
                      {item.title}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 font-normal">
                      {item.icon && <item.icon className="size-6" />}
                      {item.title}
                    </div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

interface props {
  items: sidebarGroupsProps[];
  name?: string;
}

export function AppSidebar({ items, name }: props) {
  return (
    <Sidebar>
      <SidebarContent className=" border-r shrink-0 border-border">
        <SidebarHeader className="flex  w-[16rem] justify-between gap-2 flex-row items-center fixed top-0  h-16 pb-4 from-base-300 via-base-300  to-transparent z-50">
          <SiteLogo name={name} />
          <AuthChangeTheme />
        </SidebarHeader>
        {/* Render Sidebar Groups */}
        <div className=" overflow-y-auto max-h-[calc(100vh-5.5rem)] mt-14 space-y-2">
          {items.map((group, index) => (
            <SidebarGroupComponent
              key={index}
              label={group.label}
              items={group.items}
              index={index}
            />
          ))}
          <div className="h-[1.5rem]]" />
        </div>
        <SidebarFooter className=" fixed bottom-0 from-base-300 via-base-300  to-transparent h-20 w-[16rem] ">
          <div className=" flex justify-between items-center ">
            <div className="flex  items-center space-x-1 pt-6">
              <Avatar>
                <AvatarImage src="/images/2.jpg" />
                <AvatarFallback>CEO</AvatarFallback>
              </Avatar>
              <div className=" flex flex-col">
                <h6 className="text-sm font-medium">Bruno Rwanda</h6>
                <span className=" my-sm-text">CEO</span>
              </div>
            </div>
            <ProfileButton />
          </div>
          
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
