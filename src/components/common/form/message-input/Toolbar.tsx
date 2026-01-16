import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";
import type { ToolbarButtonProps } from "./types";

interface ToolbarProps {
  showToolbar: boolean;
  activeStyles: string[];
  onExecuteCommand: (command: string) => void;
  onOpenLinkDialog: () => void;
  onToggleList: (type: "ul" | "ol") => void;
}

export const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick,
  label,
}: ToolbarButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    library="daisy"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    type="button"
    className={cn(
      isActive
        ? "bg-base-content/10"
        : "text-muted-foreground hover:text-foreground",
    )}
    title={label}
    aria-label={label}
  >
    <Icon size={16} />
  </Button>
);

export const Toolbar = ({
  showToolbar,
  activeStyles,
  onExecuteCommand,
  onOpenLinkDialog,
  onToggleList,
}: ToolbarProps) => {
  if (!showToolbar) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-base-content/50 p-2 bg-muted/30 animate-in slide-in-from-top-1 fade-in duration-200">
      <ToolbarButton
        icon={Bold}
        isActive={activeStyles.includes("bold")}
        onClick={() => onExecuteCommand("bold")}
        label="Bold"
      />
      <ToolbarButton
        icon={Italic}
        isActive={activeStyles.includes("italic")}
        onClick={() => onExecuteCommand("italic")}
        label="Italic"
      />
      <ToolbarButton
        icon={UnderlineIcon}
        isActive={activeStyles.includes("underline")}
        onClick={() => onExecuteCommand("underline")}
        label="Underline"
      />
      <ToolbarButton
        icon={Strikethrough}
        isActive={activeStyles.includes("strike")}
        onClick={() => onExecuteCommand("strikeThrough")}
        label="Strikethrough"
      />

      <div className="mx-1 h-4 w-px bg-border" />

      <ToolbarButton
        icon={LinkIcon}
        isActive={false}
        onClick={onOpenLinkDialog}
        label="Link"
      />

      <ToolbarButton
        isActive={activeStyles.includes("list")}
        onClick={() => onToggleList("ul")}
        icon={List}
        label="Bullet List"
      />
      <ToolbarButton
        icon={ListOrdered}
        isActive={activeStyles.includes("orderedList")}
        onClick={() => onToggleList("ol")}
        label="Ordered List"
      />
    </div>
  );
};
