import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import EmojiPicker, { SkinTones, Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";

interface EmojiPickerButtonProps {
  showEmojiPicker: boolean;
  onToggle: () => void;
  onEmojiSelect: (emojiData: any) => void;
}

export const EmojiPickerButton = ({
  showEmojiPicker,
  onToggle,
  onEmojiSelect,
}: EmojiPickerButtonProps) => {
  return (
    <Popover open={showEmojiPicker} onOpenChange={onToggle}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(showEmojiPicker && "bg-bg-base-content/50")}
          type="button"
          library="daisy"
        >
          <Smile size={20} />
          <span className="sr-only">Emoji Picker</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        className="w-full p-0 border-none shadow-2xl"
      >
        <EmojiPicker
          onEmojiClick={(emoji) => {
            onEmojiSelect(emoji);
            onToggle(); // Close picker after selection
          }}
          width={350}
          height={450}
          searchPlaceholder="Search emojis..."
          allowExpandReactions={false}
          defaultSkinTone={SkinTones.MEDIUM}
          theme={Theme.AUTO}
          style={
            {
              "--epr-bg-color": "var(--fallback-b1,oklch(var(--b1)))",
              "--epr-category-label-bg-color":
                "var(--fallback-b1,oklch(var(--b1)))",
              "--epr-text-color": "var(--fallback-bc,oklch(var(--bc)))",
              "--epr-search-input-bg-color":
                "var(--fallback-b2,oklch(var(--b2)))",
              "--epr-highlight-color": "var(--fallback-p,oklch(var(--p)))",
              backgroundColor: "var(--color-base-100)",
              borderRadius: "var(--radius-box)",
            } as React.CSSProperties
          }
          previewConfig={{
            showPreview: false,
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
