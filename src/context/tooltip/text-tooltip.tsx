"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UseTheme from "../theme/use-theme";

interface props {
    content : string,
    trigger : string;
}

export const TextTooltip = ({content , trigger} : props) => {
  const theme = UseTheme();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent data-theme={theme} className="dark px-2 py-1 text-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
