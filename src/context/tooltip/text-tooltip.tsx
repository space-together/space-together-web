"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UseTheme from "../theme/use-theme";
import React from "react";

interface props {
    content : string | React.ReactNode,
    trigger : string | React.ReactNode;
}

export const TextTooltip = ({content , trigger} : props) => {
  const theme = UseTheme();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent data-theme={theme} className="dark px-2 py-1 text-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
