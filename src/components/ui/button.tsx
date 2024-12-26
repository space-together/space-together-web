import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "info"
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "outline"
    | "error";
  size?: "xs" | "sm" | "md" | "lg";
  shape ?: "square" | "circle"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "", size = "md", shape = "", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Map variant and size props to DaisyUI classes
    const baseClass = "btn";
    const variantClass = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
      error: "btn-error",
      info : "btn-info"
    }[variant];

    const sizeClass = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xs : "btn-xs"
    }[size];

    const shapeClass = {
      square: "btn-square",
      circle: "btn-circle",
    }[shape];

    const classes = cn(baseClass, variantClass, sizeClass, shapeClass, className);

    return (
      <Comp
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
