import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FiAtSign } from "react-icons/fi";
import type { PickUserProps } from "../sign-to-input";

interface MentionPickerButtonProps {
  showUserPicker: boolean;
  onToggle: (show: boolean) => void;
  mentionableUsers?: PickUserProps[];
  onSelectUser: (name: string) => void;
}

export const MentionPickerButton = ({
  showUserPicker,
  onToggle,
  mentionableUsers = [],
  onSelectUser,
}: MentionPickerButtonProps) => {
  return (
    <div className="relative">
      <Popover open={showUserPicker} onOpenChange={onToggle}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            library="daisy"
            className={cn(
              "text-muted-foreground",
              showUserPicker && "bg-accent text-accent-foreground",
            )}
            onClick={() => onToggle(!showUserPicker)}
            aria-expanded={showUserPicker}
            title="Sign at"
          >
            <FiAtSign size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <span className="text-xs font-semibold text-muted-foreground">
            Mention someone
          </span>
          <div className="max-h-[200px] overflow-y-auto p-1">
            {mentionableUsers?.map((user) => (
              <button
                type="button"
                key={user.value}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-left transition-colors group"
                onClick={() => onSelectUser(user.label)}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                    {user.label.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <span className="flex-1 font-medium">{user.name}</span>
                <Check
                  size={14}
                  className="invisible group-hover:visible text-primary"
                />
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
