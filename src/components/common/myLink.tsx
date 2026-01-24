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

type Props = {
  href: string;
  type?: "button" | "link";
  className?: string;
  children: React.ReactNode;
  button?: ShadcnButtonProps | DaisyButtonProps;
  loading?: boolean;
  classname?: string;
  roleTag?: string; // "cls", "s", "su", etc
  onClick?: () => void;
};

const MyLink = ({
  href,
  type = "link",
  className = "",
  children,
  button,
  classname,
  loading = false,
  roleTag,
  onClick,
}: Props) => {
  if (type === "button" || button) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        <Button {...button} className={cn(classname)}>
          {loading ? (
            <LoadingIndicatorText className=" flex flex-row items-center gap-2">
              {roleTag && (
                <span className={"text-base-content/50 text-sm"}>
                  {roleTag}/{" "}
                </span>
              )}
              {children}
            </LoadingIndicatorText>
          ) : (
            <div className=" flex flex-row items-center gap-2">
              {roleTag && (
                <span className={"text-base-content/50 text-sm"}>
                  {roleTag}/{" "}
                </span>
              )}
              {children}
            </div>
          )}
        </Button>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(loading && "skeleton skeleton-text", className || "")}
      onClick={onClick}
    >
      {loading ? (
        <LoadingIndicatorText className=" flex flex-row items-center gap-2">
          {roleTag && (
            <span className={"text-base-content/50 text-sm"}>{roleTag}/ </span>
          )}
          {children} {loading}
        </LoadingIndicatorText>
      ) : (
        <div className=" flex flex-row items-center gap-2">
          {roleTag && (
            <span className={"text-base-content/50 text-sm"}>{roleTag}/ </span>
          )}
          {children} {loading}
        </div>
      )}
    </Link>
  );
};

export default MyLink;
