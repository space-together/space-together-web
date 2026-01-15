"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import EmojiPicker from "emoji-picker-react";
import {
  Bold,
  Check,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Plus,
  Send,
  Smile,
  Strikethrough,
  Type,
  Underline as UnderlineIcon,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FiAtSign } from "react-icons/fi";

// ============================================================================
// TYPES
// ============================================================================

export type EditorTool = "emoji" | "toolbar" | "metion" | "files" | "send";

export interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  enabledTools?: EditorTool[];
  mentionableUsers?: { id: string; name: string; status?: string }[];
  classname?: string;
}

interface ToolbarButtonProps {
  icon: React.ElementType;
  isActive?: boolean;
  onClick: () => void;
  label: string;
}

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

const ToolbarButton = ({
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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Executes a document command (legacy API but widely supported)
 */
const executeDocumentCommand = (
  command: string,
  value: string | null = null,
): void => {
  try {
    document.execCommand(command, false, value ?? "");
  } catch (e) {
    console.warn(`execCommand failed for: ${command}`, e);
  }
};

/**
 * Checks which text formatting styles are currently active
 */
const getActiveStyles = (): string[] => {
  const styles: string[] = [];
  const commands = [
    { name: "bold", key: "bold" },
    { name: "italic", key: "italic" },
    { name: "underline", key: "underline" },
    { name: "strikeThrough", key: "strike" },
    { name: "insertUnorderedList", key: "list" },
    { name: "insertOrderedList", key: "orderedList" },
  ];

  try {
    commands.forEach(({ name, key }) => {
      if (document.queryCommandState(name)) {
        styles.push(key);
      }
    });
  } catch (e) {
    console.warn("queryCommandState failed", e);
  }

  return styles;
};

/**
 * Checks if cursor is at an @ symbol for mentions
 */
const shouldShowMentionPicker = (): boolean => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;

  const range = selection.getRangeAt(0);
  const node = range.startContainer;
  const offset = range.startOffset;

  if (node.nodeType === Node.TEXT_NODE && node.textContent) {
    const charBefore = node.textContent.charAt(offset - 1);
    return charBefore === "@";
  }

  return false;
};

/**
 * Checks if user is currently in a list (ordered or unordered)
 */
const isInList = (): {
  inList: boolean;
  isOrdered: boolean;
  isUnordered: boolean;
} => {
  const isUnordered = document.queryCommandState("insertUnorderedList");
  const isOrdered = document.queryCommandState("insertOrderedList");

  return {
    inList: isUnordered || isOrdered,
    isOrdered,
    isUnordered,
  };
};

/**
 * Gets the current list item element if cursor is in one
 */
const getCurrentListItem = (): HTMLLIElement | null => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  return range.startContainer.parentElement?.closest("li") ?? null;
};

/**
 * Creates HTML for a styled mention
 */
const createMentionHTML = (name: string): string => {
  return `<span style="color: #2563eb; font-weight:600; background-color: rgba(37,99,235,0.08); padding:1px 4px; border-radius:4px;" contenteditable="false">@${name}</span>&nbsp;`;
};

/**
 * Creates HTML for a link
 */
const createLinkHTML = (url: string, text?: string): string => {
  const display = text || url;
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: #2563eb;">${display}</a>&nbsp;`;
};

/**
 * Inserts HTML content at cursor position
 */
const insertHTMLAtCursor = (html: string, fallbackText: string): void => {
  try {
    executeDocumentCommand("insertHTML", html);
  } catch {
    executeDocumentCommand("insertText", fallbackText);
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MessageInput({
  value = "",
  onChange,
  onSend,
  disabled = false,
  className,
  placeholder = "Message #general",
  enabledTools = ["toolbar", "emoji", "files", "metion", "send"],
  mentionableUsers = [
    { id: "1", name: "Alice", status: "online" },
    { id: "2", name: "Bob", status: "away" },
    { id: "3", name: "Charlie", status: "offline" },
    { id: "4", name: "David", status: "online" },
    { id: "5", name: "Eve", status: "busy" },
  ],
  classname,
}: MessageInputProps) {
  // ============================================================================
  // STATE
  // ============================================================================

  const [showToolbar, setShowToolbar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserPicker, setShowUserPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  const [activeStyles, setActiveStyles] = useState<string[]>([]);

  // ============================================================================
  // REFS
  // ============================================================================

  const editorRef = useRef<HTMLDivElement>(null);
  const emojiTriggerRef = useRef<HTMLDivElement>(null);
  const userTriggerRef = useRef<HTMLDivElement>(null);
  const pickerContainerRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const updateActiveStyles = (): void => {
    setActiveStyles(getActiveStyles());
  };

  const handleEditorInput = (): void => {
    const content = editorRef.current?.innerHTML || "";
    onChange?.(content);

    if (shouldShowMentionPicker()) {
      setShowUserPicker(true);
    }

    updateActiveStyles();
  };

  const executeCommand = (
    command: string,
    commandValue: string | null = null,
  ): void => {
    executeDocumentCommand(command, commandValue);
    editorRef.current?.focus();
    updateActiveStyles();
    handleEditorInput();
  };

  const handleToggleList = (type: "ul" | "ol"): void => {
    const command = type === "ul" ? "insertUnorderedList" : "insertOrderedList";
    executeDocumentCommand(command);
    editorRef.current?.focus();
    updateActiveStyles();
    handleEditorInput();
  };

  const handleInsertEmoji = (emojiData: any): void => {
    const emoji = emojiData.emoji;
    if (!emoji) return;

    editorRef.current?.focus();
    executeCommand("insertText", emoji);
    setShowEmojiPicker(false);
  };

  const handleOpenLinkDialog = (): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedRange(range.cloneRange());
      setLinkText(range.toString());
    } else {
      setSavedRange(null);
      setLinkText("");
    }
    setLinkUrl("");
    setShowLinkDialog(true);
  };

  const handleConfirmLink = (): void => {
    if (!linkUrl) {
      setShowLinkDialog(false);
      return;
    }

    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    } else {
      editorRef.current?.focus();
    }

    const linkHTML = createLinkHTML(linkUrl, linkText);
    const fallbackText = (linkText || linkUrl) + " ";
    insertHTMLAtCursor(linkHTML, fallbackText);

    setShowLinkDialog(false);
    setLinkText("");
    setLinkUrl("");
    handleEditorInput();
  };

  const handleInsertMention = (name: string): void => {
    const mentionHTML = createMentionHTML(name);
    const fallbackText = `@${name} `;
    insertHTMLAtCursor(mentionHTML, fallbackText);
    setShowUserPicker(false);
    handleEditorInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    const { inList, isOrdered, isUnordered } = isInList();

    // Handle Enter key in lists
    if (e.key === "Enter" && inList) {
      const li = getCurrentListItem();

      // Exit list if pressing Enter on empty list item
      if (li && li.textContent?.trim() === "") {
        e.preventDefault();
        executeDocumentCommand("insertParagraph");
        executeDocumentCommand("outdent");
        updateActiveStyles();
        return;
      }
      return;
    }

    // Handle Backspace in lists
    if (e.key === "Backspace" && inList) {
      const li = getCurrentListItem();

      // Exit list if backspacing in empty list item
      if (li && li.textContent === "") {
        e.preventDefault();
        executeDocumentCommand("outdent");
        updateActiveStyles();
        return;
      }
    }

    // Send message on Enter (not in list, not holding Shift)
    if (e.key === "Enter" && !e.shiftKey && !inList) {
      e.preventDefault();
      onSend?.();
    }
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Handle clicks outside of pickers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (
        showEmojiPicker &&
        emojiTriggerRef.current &&
        !emojiTriggerRef.current.contains(target) &&
        pickerContainerRef.current &&
        !pickerContainerRef.current.contains(target)
      ) {
        setShowEmojiPicker(false);
      }

      if (
        showUserPicker &&
        userTriggerRef.current &&
        !userTriggerRef.current.contains(target)
      ) {
        setShowUserPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker, showUserPicker]);

  // Sync editor content with value prop
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    // Only update if external value differs from current DOM
    if (value !== el.innerHTML) {
      el.innerHTML = value || "";
    }
  }, [value]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderToolbar = (): JSX.Element | null => {
    if (!showToolbar) return null;

    return (
      <div className="flex flex-wrap items-center gap-1 border-b border-base-content/50 p-2 bg-muted/30 animate-in slide-in-from-top-1 fade-in duration-200">
        <ToolbarButton
          icon={Bold}
          isActive={activeStyles.includes("bold")}
          onClick={() => executeCommand("bold")}
          label="Bold"
        />
        <ToolbarButton
          icon={Italic}
          isActive={activeStyles.includes("italic")}
          onClick={() => executeCommand("italic")}
          label="Italic"
        />
        <ToolbarButton
          icon={UnderlineIcon}
          isActive={activeStyles.includes("underline")}
          onClick={() => executeCommand("underline")}
          label="Underline"
        />
        <ToolbarButton
          icon={Strikethrough}
          isActive={activeStyles.includes("strike")}
          onClick={() => executeCommand("strikeThrough")}
          label="Strikethrough"
        />

        <div className="mx-1 h-4 w-px bg-border" />

        <ToolbarButton
          icon={LinkIcon}
          isActive={false}
          onClick={handleOpenLinkDialog}
          label="Link"
        />

        <ToolbarButton
          isActive={activeStyles.includes("list")}
          onClick={() => handleToggleList("ul")}
          icon={List}
          label="Bullet List"
        />
        <ToolbarButton
          icon={ListOrdered}
          isActive={activeStyles.includes("orderedList")}
          onClick={() => handleToggleList("ol")}
          label="Ordered List"
        />
      </div>
    );
  };

  const renderLinkDialog = (): JSX.Element => (
    <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
          <DialogDescription>
            Create a link to a web page or file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="link-text" className="text-xs">
              Text (Optional)
            </Label>
            <Input
              id="link-text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="h-8 text-sm"
              placeholder="Clickable text"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="link-url" className="text-xs">
              URL
            </Label>
            <Input
              id="link-url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="h-8 text-sm"
              placeholder="https://example.com"
              autoFocus
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose>
              <Button
                type="button"
                library="daisy"
                variant="outline"
                size="sm"
                onClick={() => setShowLinkDialog(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              library="daisy"
              size="sm"
              onClick={handleConfirmLink}
            >
              Insert
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderPlaceholder = (): JSX.Element | null => {
    const shouldShow =
      !value &&
      (!editorRef.current || editorRef.current.innerText.trim().length === 0);

    if (!shouldShow) return null;

    return (
      <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none select-none opacity-50">
        {placeholder}
      </div>
    );
  };

  const renderEmojiPicker = (): JSX.Element | null => {
    if (!enabledTools.includes("emoji")) return null;

    return (
      <div className="relative" ref={emojiTriggerRef}>
        <Button
          variant="ghost"
          size="sm"
          library="daisy"
          className={cn(showEmojiPicker && "bg-accent")}
          onClick={() => setShowEmojiPicker((s) => !s)}
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
              onEmojiClick={handleInsertEmoji}
              width={350}
              height={450}
              searchPlaceholder="Search emojis..."
              allowExpandReactions={false}
              style={{
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
              }}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
      </div>
    );
  };

  const renderMentionPicker = (): JSX.Element | null => {
    if (!enabledTools.includes("metion")) return null;

    return (
      <div className="relative" ref={userTriggerRef}>
        <Popover open={showUserPicker} onOpenChange={setShowUserPicker}>
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
              onClick={() => setShowUserPicker((s) => !s)}
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
                  key={user.id}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-left transition-colors group"
                  onClick={() => handleInsertMention(user.name)}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-background rounded-full",
                        user.status === "online"
                          ? "bg-success"
                          : user.status === "busy"
                            ? "bg-error"
                            : "bg-gray-400",
                      )}
                    />
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

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div
      className={cn(
        "flex w-full flex-col border-sm bg-base-100 transition-all focus-within:ring-1 focus-within:ring-primary/20 relative card overflow-y-auto overflow-visible max-h-96",
        className,
      )}
    >
      {renderToolbar()}
      {renderLinkDialog()}

      <div
        className={cn(
          "relative flex-1 min-h-20 max-h-[400px] overflow-y-auto cursor-text p-3",
          classname,
        )}
        onClick={() => editorRef.current?.focus()}
      >
        {renderPlaceholder()}

        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleEditorInput}
          onKeyUp={updateActiveStyles}
          onMouseUp={updateActiveStyles}
          onKeyDown={handleKeyDown}
          role="textbox"
          aria-multiline="true"
          className="outline-none prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:pl-1 whitespace-pre-wrap break-words"
        />
      </div>

      <div className="flex items-center justify-between p-2 bg-transparent mt-auto relative border-t border-transparent">
        <div className="flex items-center gap-1">
          {enabledTools.includes("files") && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full bg-muted/40 text-base-content"
              library="daisy"
              type="button"
            >
              <Plus size={18} />
            </Button>
          )}

          {renderEmojiPicker()}

          {enabledTools.includes("toolbar") && (
            <Button
              variant="ghost"
              type="button"
              size="sm"
              library="daisy"
              className={cn(
                "h-8 px-2 font-medium transition-colors hover:bg-muted",
                showToolbar && "bg-accent",
              )}
              onClick={() => setShowToolbar((s) => !s)}
              title="Tools"
            >
              <Type size={16} className="mr-1" />
              <span className="text-xs font-bold">Aa</span>
            </Button>
          )}

          {renderMentionPicker()}
        </div>

        {enabledTools.includes("send") && (
          <Button
            type="button"
            onClick={onSend}
            variant={value ? "primary" : "ghost"}
            aria-label="Send message"
            library="daisy"
          >
            <Send size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
