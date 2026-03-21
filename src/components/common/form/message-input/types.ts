import type { LucideIcon } from "lucide-react";
import type { PickUserProps } from "../sign-to-input";

export type EditorTool = "emoji" | "toolbar" | "metion" | "files" | "send";

export interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  enabledTools?: EditorTool[];
  mentionableUsers?: PickUserProps[];
  classname?: string;
  onSend?: () => void;
}

export interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
  label: string;
}
