"use client";

import { cn } from "@/lib/utils";
import Link, { useLinkStatus } from "next/link";
import type React from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import {
  Button,
  type DaisyButtonProps,
  type ShadcnButtonProps,
} from "../ui/button";

type LoadingIndicatorTextProps<T extends ElementType> = {
  element?: T;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export const LoadingIndicatorText = <T extends ElementType = "div">({
  children,
  className,
  element,
  ...props
}: LoadingIndicatorTextProps<T>) => {
  const { pending } = useLinkStatus();
  const Component = element || "div";
  return (
    <Component
      {...props}
      className={cn(className, pending && "skeleton skeleton-text")}
    >
      {children}
    </Component>
  );
};

interface props {
  className?: string;
}

export function LoadingIndicator({ className }: props) {
  const { pending } = useLinkStatus();
  return pending ? (
    <div role="status" className={cn("loading loading-spinner", className)} />
  ) : null;
}

type MyLinkProps = {
  href: string;
  children: React.ReactNode;
  type?: "button" | "link";
  className?: string;
  button?: ShadcnButtonProps | DaisyButtonProps;
  loading?: boolean;
  roleTag?: string;
};

const MyLink = ({
  href,
  type = "link",
  className = "",
  children,
  button,
  loading = false,
  roleTag,
}: MyLinkProps) => {
  const renderContent = () => {
    const contentWrapper = loading ? LoadingIndicatorText : "div";
    const WrapperComponent = contentWrapper;

    return (
      <WrapperComponent className="flex flex-row items-center gap-2">
        {roleTag && (
          <span className="text-base-content/50 text-sm">{roleTag}/ </span>
        )}
        {children}
      </WrapperComponent>
    );
  };

  const isButtonType = type === "button" || button;

  if (isButtonType) {
    return (
      <Link href={href} className={className}>
        <Button {...button} className={className}>
          {renderContent()}
        </Button>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(loading && "skeleton skeleton-text", className)}
    >
      {renderContent()}
    </Link>
  );
};

export default MyLink;
