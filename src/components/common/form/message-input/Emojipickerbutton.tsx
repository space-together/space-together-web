import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EmojiPicker, { SkinTones } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useRef } from "react";

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
  const emojiTriggerRef = useRef<HTMLDivElement>(null);
  const pickerContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={emojiTriggerRef}>
      <Button
        variant="ghost"
        size="sm"
        library="daisy"
        className={cn(showEmojiPicker && "bg-accent")}
        onClick={onToggle}
        aria-expanded={showEmojiPicker}
        aria-haspopup="dialog"
        type="button"
      >
        <Smile size={20} />
      </Button>

      {showEmojiPicker && (
        <div
          ref={pickerContainerRef}
          className="absolute bottom-14 left-0 z-50 border-base-content/10 shadow-2xl border rounded-lg animate-in fade-in zoom-in-95 duration-200"
        >
          <EmojiPicker
            onEmojiClick={(emoji) => onEmojiSelect(emoji)}
            width={350}
            height={450}
            searchPlaceholder="Search emojis..."
            allowExpandReactions={false}
            defaultSkinTone={SkinTones.MEDIUM}
            style={
              {
                "--epr-bg-color": "var(--fallback-b1,oklch(var(--b1)))",
                "--epr-category-label-bg-color":
                  "var(--fallback-b1,oklch(var(--b1)))",
                "--epr-text-color": "var(--fallback-bc,oklch(var(--bc)))",
                "--epr-search-input-bg-color":
                  "var(--fallback-b2,oklch(var(--b2)))",
                "--epr-highlight-color": "var(--fallback-p,oklch(var(--p)))",
                backgroundColor: "var(--color-base-300)",
                border:
                  "1px solid color-mix(in oklab, var(--color-base-content) 50%, transparent",
                borderRadius: "var(--radius-box)",
              } as React.CSSProperties
            }
            previewConfig={{
              showPreview: false,
            }}
          />
        </div>
      )}
    </div>
  );
};
