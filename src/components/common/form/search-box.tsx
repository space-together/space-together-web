"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBoxProps {
  /** Called when the user searches (presses Enter or clicks search button) */
  onSearch: (query: string) => void | Promise<void>;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional debounce time for live search (in ms) */
  debounceMs?: number;
  /** Whether to auto-search as user types */
  live?: boolean;
  /** Whether search is loading */
  loading?: boolean;
  className?: string;
}

/**
 * 🔍 Reusable SearchBox component
 * Can be used across pages like Teacher, Student, Class etc.
 *
 * Example:
 * <SearchBox onSearch={(q) => fetchTeachers(q)} placeholder="Search teacher..." />
 */
const SearchBox = ({
  onSearch,
  placeholder = "Search...",
  debounceMs = 400,
  live = true,
  loading = false,
  className,
}: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  // 🧠 Trigger search manually
  const handleSearch = async () => {
    await onSearch(query.trim());
  };

  // 🧩 Auto search as user types (optional)
  useEffect(() => {
    if (!live) return;
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      onSearch(query.trim());
    }, debounceMs);

    setTypingTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (query.trim() === "") {
      onSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={cn("relative flex flex-row", className)}>
      <Button
        onClick={handleSearch}
        disabled={loading}
        variant="ghost"
        library="daisy"
        size="sm"
        role={loading ? "loading" : undefined}
        className=" absolute top-0.5"
      >
        {!loading && <SearchIcon aria-hidden="true" size={16} />}
        <span className="sr-only">search</span>
      </Button>
      <Input
        type="text"
        className=" pl-10"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default SearchBox;
