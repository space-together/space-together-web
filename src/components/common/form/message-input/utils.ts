/**
 * Executes a document command (legacy API but widely supported)
 */
export const executeDocumentCommand = (
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
export const getActiveStyles = (): string[] => {
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
export const shouldShowMentionPicker = (): boolean => {
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
export const isInList = (): {
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
export const getCurrentListItem = (): HTMLLIElement | null => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  return range.startContainer.parentElement?.closest("li") ?? null;
};

/**
 * Creates HTML for a styled mention
 */
export const createMentionHTML = (name: string): string => {
  return `<span style="color: #2563eb; font-weight:600; background-color: rgba(37,99,235,0.08); padding:1px 4px; border-radius:4px;" contenteditable="false">@${name}</span>&nbsp;`;
};

/**
 * Creates HTML for a link
 */
export const createLinkHTML = (url: string, text?: string): string => {
  const display = text || url;
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: #2563eb;">${display}</a>&nbsp;`;
};

/**
 * Inserts HTML content at cursor position
 */
export const insertHTMLAtCursor = (
  html: string,
  fallbackText: string,
): void => {
  try {
    executeDocumentCommand("insertHTML", html);
  } catch {
    executeDocumentCommand("insertText", fallbackText);
  }
};
