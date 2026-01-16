"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Send, Type } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState, type JSX } from "react";
import { EmojiPickerButton } from "./Emojipickerbutton";
import { LinkDialog } from "./Linkdialog";
import { MentionPickerButton } from "./Mentionpickerbutton";
import { Toolbar } from "./Toolbar";
import type { MessageInputProps } from "./types";
import {
  createLinkHTML,
  createMentionHTML,
  executeDocumentCommand,
  getActiveStyles,
  getCurrentListItem,
  insertHTMLAtCursor,
  isInList,
  shouldShowMentionPicker,
} from "./utils";

export default function MessageInput({
  value = "",
  onChange,
  disabled = false,
  className,
  placeholder = "Message #general",
  enabledTools = ["toolbar", "emoji", "files", "metion", "send"],
  onSend,
  mentionableUsers = [
    {
      value: "user1",
      label: "John Doe",
      image: "/images/1.jpg",
    },
    {
      value: "user2",
      label: "Jane Doe",
      image: "/images/2.jpg",
    },
    {
      value: "user3",
      label: "Alice Smith",
      image: "/images/3.jpg",
    },
  ],
  classname,
}: MessageInputProps) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserPicker, setShowUserPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  const [activeStyles, setActiveStyles] = useState<string[]>([]);

  const editorRef = useRef<HTMLDivElement>(null);

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

    const selection = window.getSelection();
    if (savedRange && selection) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }

    executeCommand("insertText", emoji);

    // Clear the saved range and close picker
    setSavedRange(null);
    setShowEmojiPicker(false);
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0));
    }
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

  const handleSend = () => {
    if (disabled || !value.trim()) return;

    onSend?.();

    // Clear the editor after sending
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      onChange?.("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    const { inList } = isInList();

    // 1. Handle Enter Key
    if (e.key === "Enter") {
      // SCENARIO A: Ctrl + Enter ALWAYS sends, regardless of being in a list
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        handleSend();
        return;
      }

      // SCENARIO B: Normal Enter (No Shift, No Ctrl)
      if (!e.shiftKey) {
        if (inList) {
          const li = getCurrentListItem();
          // If user presses Enter on an empty list item, exit the list
          if (li && li.textContent?.trim() === "") {
            e.preventDefault();
            executeDocumentCommand("insertParagraph");
            executeDocumentCommand("outdent");
            updateActiveStyles();
            return;
          }
          // Otherwise, let the browser handle creating a new <li> naturally
        } else {
          // Not in a list, normal Enter sends the message
          e.preventDefault();
          handleSend();
        }
      }
      // If Shift + Enter, let the browser handle the newline naturally
    }

    // 2. Handle Backspace (Existing list logic)
    if (e.key === "Backspace" && inList) {
      const li = getCurrentListItem();
      if (li && li.textContent === "") {
        e.preventDefault();
        executeDocumentCommand("outdent");
        updateActiveStyles();
      }
    }
  };

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    if (value !== el.innerHTML) {
      el.innerHTML = value || "";
    }
  }, [value]);

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

  return (
    <div
      className={cn(
        "flex w-full flex-col border-sm bg-base-100 transition-all focus-within:ring-1 focus-within:ring-base-content/50 relative card overflow-y-auto overflow-visible max-h-96",
        className,
      )}
    >
      <Toolbar
        showToolbar={showToolbar}
        activeStyles={activeStyles}
        onExecuteCommand={executeCommand}
        onOpenLinkDialog={handleOpenLinkDialog}
        onToggleList={handleToggleList}
      />

      <LinkDialog
        open={showLinkDialog}
        onOpenChange={setShowLinkDialog}
        linkText={linkText}
        linkUrl={linkUrl}
        onLinkTextChange={setLinkText}
        onLinkUrlChange={setLinkUrl}
        onConfirm={handleConfirmLink}
      />

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
          onKeyUp={() => {
            updateActiveStyles();
            saveSelection();
          }}
          onMouseUp={() => {
            updateActiveStyles();
            saveSelection();
          }}
          onKeyDown={handleKeyDown}
          role="textbox"
          aria-multiline="true"
          className="outline-none prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:pl-1 whitespace-pre-wrap break-words text-base-content"
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

          {enabledTools.includes("emoji") && (
            <EmojiPickerButton
              showEmojiPicker={showEmojiPicker}
              onToggle={() => setShowEmojiPicker((s) => !s)}
              onEmojiSelect={handleInsertEmoji}
            />
          )}

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

          {enabledTools.includes("metion") && (
            <MentionPickerButton
              showUserPicker={showUserPicker}
              onToggle={setShowUserPicker}
              mentionableUsers={mentionableUsers}
              onSelectUser={handleInsertMention}
            />
          )}
        </div>

        {enabledTools.includes("send") && (
          <Button
            type="button"
            onClick={handleSend}
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
