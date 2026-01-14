"use client";
import { UserSmCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Option } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import MyAvatarGroup from "../image/my-avatar-group";
import NoItemsPage from "../pages/no-items-page";
import SearchBox from "./search-box";

export interface PickUserProps extends Option {
  image?: string;
}

export interface SignToInputProps {
  onChange?: (value: PickUserProps[]) => void;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  name?: string;
  disabled?: boolean;
  users?: PickUserProps[];
  value?: PickUserProps[];
  placeholder?: string;
  onSearch?: (query: string) => Promise<void>;
}

const SignToInput = ({
  onChange,
  onSearch,
  disabled,
  name,
  open,
  className,
  title,
  description,
  users = [],
  placeholder,
}: SignToInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isInternalOpen, setIsInternalOpen] = useState(open || false);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced Search Effect
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (onSearch) {
        setIsSearching(true);
        await onSearch(searchQuery);
        setIsSearching(false);
      }
    }, 400); // Wait 400ms after user stops typing

    return () => clearTimeout(handler);
  }, [searchQuery, onSearch]);

  // We no longer filter locally. 'users' prop is now the filtered list from backend.
  const filteredUsers = users;

  const selectedUsers = useMemo(() => {
    return users.filter((u) => selectedIds.has(u.value));
  }, [users, selectedIds]);

  const toggleUser = (value: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setSelectedIds(newSet);
  };

  const handleDone = () => {
    onChange?.(selectedUsers);
    setIsInternalOpen(false);
  };

  return (
    <Dialog open={isInternalOpen} onOpenChange={setIsInternalOpen}>
      <DialogTrigger asChild disabled={disabled} className=" w-fit">
        <div className="cursor-pointer inline-block">
          {selectedUsers.length > 0 ? (
            <div className="flex items-center gap-1 p-2 border rounded-md flex-row w-fit">
              <MyAvatarGroup
                items={selectedUsers.map((user) => ({
                  src: user.image,
                  alt: user.label,
                }))}
                size="sm"
                limit={5}
                type="cycle"
                className=" w-fit"
              />
              <span className="text-xs text-muted-foreground ml-2">Edit</span>
            </div>
          ) : (
            <Button type="button" variant={"outline"}>
              {name ?? "Sign to"}
            </Button>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className={cn("sm:max-w-xl", className)}>
        <DialogHeader>
          <DialogTitle>{title ?? "Select Users"}</DialogTitle>
          <DialogDescription>
            {description ?? "Search and select users from the list below."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <SearchBox
              onSearch={(q) => setSearchQuery(q)}
              placeholder={placeholder}
            />
          </div>

          <div className="flex flex-col pr-1 w-full max-h-[300px] overflow-y-auto">
            {filteredUsers.length === 0 && !isSearching ? (
              <div className="text-center text-sm text-muted-foreground py-4">
                <NoItemsPage
                  imageClassName="w-48 h-27"
                  title="No users found."
                />
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.value}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toggleUser(user.value)}
                >
                  <Checkbox
                    checked={selectedIds.has(user.value)}
                    onCheckedChange={() => toggleUser(user.value)}
                  />
                  <div className="pointer-events-none">
                    <UserSmCard
                      name={user.label || "Unknown"}
                      image={user.image || ""}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant={"info"}
            library="daisy"
            onClick={handleDone}
          >
            Done ({selectedIds.size})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignToInput;
