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
import { useMemo, useState } from "react";
import MyAvatarGroup from "../image/my-avatar-group";
import NoItemsPage from "../pages/no-items-page";
import SearchBox from "./search-box";

interface PickUserProps extends Option {
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
}

const SignToInput = ({
  onChange,
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

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const lowerQuery = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(lowerQuery) ||
        u.username?.toLowerCase().includes(lowerQuery) ||
        u.email?.toLowerCase().includes(lowerQuery),
    );
  }, [users, searchQuery]);

  const selectedUsers = useMemo(() => {
    return users.filter((u) => selectedIds.has(u.id));
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

  const handleSelectAll = () => {
    const newSet = new Set(selectedIds);
    const allFilteredSelected = filteredUsers.every((u) => newSet.has(u.value));

    if (allFilteredSelected) {
      filteredUsers.forEach((u) => newSet.delete(u.value));
    } else {
      filteredUsers.forEach((u) => newSet.add(u.value));
    }
    setSelectedIds(newSet);
  };

  const isAllSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedIds.has(u.id));

  const handleDone = () => {
    onChange?.(selectedUsers);
    setIsInternalOpen(false);
  };

  return (
    <Dialog open={isInternalOpen} onOpenChange={setIsInternalOpen}>
      <DialogTrigger asChild disabled={disabled} className=" w-fit">
        <div className="cursor-pointer inline-block">
          {selectedUsers.length > 0 && selectedUsers.length !== users.length ? (
            <div className="flex items-center gap-1 p-2 border-sm card  flex-row w-fit">
              <MyAvatarGroup
                items={selectedUsers.map((user) => ({
                  src: user.image,
                  alt: user.name,
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
          {/* Search Input */}
          <div>
            <SearchBox
              onSearch={(q) => setSearchQuery(q)}
              placeholder={placeholder}
            />
          </div>

          {/* All Students Checkbox */}
          <div className="flex gap-2 items-center pb-2 border-b">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              id="select-all"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium cursor-pointer"
            >
              Select All ({filteredUsers.length})
            </label>
          </div>

          {/* User List */}
          <div className="flex flex-col pr-1 w-full">
            {filteredUsers.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-4">
                <NoItemsPage
                  imageClassName="  w-48 h-27"
                  title="No users found."
                />
              </div>
            ) : (
              filteredUsers.map((user) => {
                return (
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
                );
              })
            )}
          </div>
        </div>

        <DialogFooter className=" ">
          {/* Use custom click handler to trigger onChange */}
          <Button
            type="button"
            variant={"info"}
            library="daisy"
            onClick={handleDone}
          >
            Done ({selectedUsers.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignToInput;
