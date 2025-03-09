import React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          " textarea textarea-bordered w-full",
          //  "flex bg-base-100 min-h-[80px] w-full ring-offset-background border border-base-300 px-3 py-2 text-sm card transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-background focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
