"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// DaisyUI tab variants
const tabsListVariants = cva("tabs", {
  variants: {
    variant: {
      default: "",
      boxed: "tabs-boxed",
      bordered: "tabs-bordered",
      lifted: "tabs-lifted",
    },
    size: {
      xs: "tabs-xs",
      sm: "tabs-sm",
      md: "tabs-md",
      lg: "tabs-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const tabsTriggerVariants = cva("tab", {
  variants: {
    variant: {
      default: "",
      boxed: "",
      bordered: "",
      lifted: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root> {
  library?: "daisy" | "radix";
}

export interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  library?: "daisy" | "radix";
}

export interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  library?: "daisy" | "radix";
}

function Tabs({ className, library = "daisy", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(library === "daisy" ? "" : "flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant,
  size,
  library = "daisy",
  ...props
}: TabsListProps) {
  if (library === "daisy") {
    return (
      <TabsPrimitive.List
        role="tablist"
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant, size }), className)}
        {...props}
      />
    );
  }

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-base-100 text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant,
  library = "daisy",
  ...props
}: TabsTriggerProps) {
  if (library === "daisy") {
    return (
      <TabsPrimitive.Trigger
        role="tab"
        data-slot="tabs-trigger"
        className={cn(
          tabsTriggerVariants({ variant }),
          "transition-colors",
          "data-[state=active]:border-b-2 data-[state=active]:border-b-primary",
          "data-[state=inactive]:opacity-100",
          "hover:opacity-100",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };

