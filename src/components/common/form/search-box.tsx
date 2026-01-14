"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void | Promise<void>;
  placeholder?: string;
  debounceMs?: number;
  live?: boolean;
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

  const handleSearch = async () => {
    await onSearch(query.trim());
  };

  useEffect(() => {
    if (!live) return;
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      onSearch(query.trim());
    }, debounceMs);

    setTypingTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (query.trim() === "") {
      onSearch("");
    }
  }, [query]);

  return (
    <div className={cn("relative flex flex-row", className)}>
      <Button
        onClick={handleSearch}
        disabled={loading}
        variant="ghost"
        library="daisy"
        shape={"circle"}
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
