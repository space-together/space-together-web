"use client";
import SearchBox from "@/components/common/form/search-box";
import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import { ClockIcon, SearchIcon, TrendingUpIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { allPages } from "./landing-nav-all-pages";

interface LadingNavSearchDialogProps {
  auth?: AuthContext | null;
  lang: Locale;
}

interface PageItem {
  label: string;
  href: string;
  description?: string;
  category: string;
}

interface SearchHistoryItem {
  label: string;
  href: string;
  timestamp: number;
}

const STORAGE_KEY = "search_history";
const MAX_HISTORY_ITEMS = 5;

const LadingNavSearchDialog = ({ lang, auth }: LadingNavSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const history = JSON.parse(stored);
        setSearchHistory(history);
      }
    } catch (error) {
      console.error("Failed to load search history:", error);
    }
  }, []);

  // Save to localStorage whenever history changes
  const saveToHistory = (page: PageItem) => {
    try {
      const newItem: SearchHistoryItem = {
        label: page.label,
        href: page.href,
        timestamp: Date.now(),
      };

      // Remove duplicate if exists
      const filtered = searchHistory.filter((item) => item.href !== page.href);

      // Add new item at the beginning and limit to MAX_HISTORY_ITEMS
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      setSearchHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  };

  // Clear search history
  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSearchHistory([]);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  };

  // Remove single item from history
  const removeFromHistory = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updated = searchHistory.filter((item) => item.href !== href);
      setSearchHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to remove from history:", error);
    }
  };

  // Filter pages based on search query
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return allPages;

    const query = searchQuery.toLowerCase();
    return allPages.filter(
      (page) =>
        page.label.toLowerCase().includes(query) ||
        page.description?.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  // Group filtered pages by category
  const groupedPages = useMemo(() => {
    const groups: Record<string, PageItem[]> = {};
    filteredPages.forEach((page) => {
      if (!groups[page.category]) {
        groups[page.category] = [];
      }
      groups[page.category].push(page);
    });
    return groups;
  }, [filteredPages]);

  // Get popular/suggested pages (you can customize this logic)
  const suggestedPages = useMemo(() => {
    return allPages.slice(0, 4); // Show first 4 pages as suggestions
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLinkClick = (page: PageItem) => {
    saveToHistory(page);
    setIsOpen(false);
    setSearchQuery("");
  };

  const showEmptyState = !searchQuery.trim();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" library="daisy">
          <SearchIcon aria-hidden="true" size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent hideClose className="sm:max-w-2xl max-h-[95vh] min-h-80">
        <div className="flex flex-col gap-4">
          <SearchBox onSearch={handleSearch} />

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(95vh-120px)]">
            {showEmptyState ? (
              // Show recent searches and suggestions when no search query
              <div className="flex flex-col gap-6">
                {/* Recent Searches */}
                {searchHistory.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label className="opacity-80 text-sm font-semibold flex items-center gap-2">
                        <ClockIcon size={16} />
                        Recent Searches
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="text-xs opacity-60 hover:opacity-100"
                      >
                        Clear all
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      {searchHistory.map((item) => (
                        <MyLink
                          key={item.href}
                          href={`/${lang}${item.href}`}
                          onClick={() =>
                            handleLinkClick({
                              label: item.label,
                              href: item.href,
                              category: "",
                            })
                          }
                          className="group/page p-2 rounded-[var(--radius-box)] hover:bg-base-200 transition-colors flex items-center justify-between w-full"
                        >
                          <div className="flex items-center gap-2 ">
                            <ClockIcon
                              size={16}
                              className="opacity-40 flex-shrink-0"
                            />
                            <span className="font-medium group-hover/page:text-primary duration-150">
                              {item.label}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => removeFromHistory(item.href, e)}
                            className="opacity-0 group-hover/page:opacity-60 hover:!opacity-100 transition-opacity"
                          >
                            <XIcon size={14} />
                          </Button>
                        </MyLink>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Pages */}
                <div className="flex flex-col gap-2">
                  <Label className="opacity-80 text-sm font-semibold flex items-center gap-2">
                    <TrendingUpIcon size={16} />
                    Suggested Pages
                  </Label>
                  <div className="flex flex-col gap-1">
                    {suggestedPages.map((page) => (
                      <MyLink
                        key={page.href}
                        href={`/${lang}${page.href}`}
                        onClick={() => handleLinkClick(page)}
                        className="group/page p-2 rounded-[var(--radius-box)] hover:bg-base-200 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium group-hover/page:text-primary duration-150">
                            {page.label}
                          </span>
                          {page.description && (
                            <span className="text-sm opacity-70">
                              {page.description}
                            </span>
                          )}
                        </div>
                      </MyLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredPages.length === 0 ? (
              // No results found
              <div className="text-center py-8 opacity-60">
                <p>No pages found matching "{searchQuery}"</p>
              </div>
            ) : (
              // Search results
              Object.entries(groupedPages).map(([category, pages]) => (
                <div key={category} className="flex flex-col gap-2">
                  <Label className="opacity-80 text-sm font-semibold">
                    {category}
                  </Label>
                  <div className="flex flex-col gap-1">
                    {pages.map((page) => (
                      <MyLink
                        key={page.href}
                        href={`/${lang}${page.href}`}
                        onClick={() => handleLinkClick(page)}
                        className="group/page p-2 rounded-[var(--radius-box)] hover:bg-base-200 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium group-hover/page:text-primary duration-150">
                            {page.label}
                          </span>
                          {page.description && (
                            <span className="text-sm opacity-70">
                              {page.description}
                            </span>
                          )}
                        </div>
                      </MyLink>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LadingNavSearchDialog;
