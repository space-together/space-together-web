"use client";
// StartConversationDialog.tsx
// Dialog for creating new conversations matching backend API

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { searchUsersAction } from "@/lib/messaging/users.actions";
import type { RelatedUser } from "@/lib/schema/common-schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMessageCircle, LuSearch, LuX } from "react-icons/lu";
import { toast } from "sonner";

interface StartConversationDialogProps {
  children?: React.ReactNode;
}

// Helper to get display name from RelatedUser
function getUserDisplayName(user: RelatedUser): string {
  if (user.user_type === "STUDENT" || user.user_type === "TEACHER" || 
      user.user_type === "SCHOOLSTAFF" || user.user_type === "USER") {
    return user.name || "Unknown";
  }
  return "Unknown";
}

// Helper to get user ID
function getUserId(user: RelatedUser): string {
  return user._id || "";
}

export function StartConversationDialog({ children }: StartConversationDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<RelatedUser[]>([]);
  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [initialMessage, setInitialMessage] = useState("");
  
  // User search
  const [availableUsers, setAvailableUsers] = useState<RelatedUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch users when search query changes
  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim().length < 2) {
        setAvailableUsers([]);
        return;
      }

      setIsSearching(true);
      try {
        const users = await searchUsersAction(searchQuery, 10);
        // Filter out already selected users
        const filtered = users.filter(
          (user) => !selectedUsers.find((u) => getUserId(u) === getUserId(user))
        );
        setAvailableUsers(filtered);
      } catch (error) {
        console.error("Failed to search users:", error);
        toast.error("Failed to search users");
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, selectedUsers]);

  const filteredUsers = availableUsers;

  const handleSelectUser = (user: RelatedUser) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchQuery("");
    
    // Auto-enable group mode if more than 1 user
    if (selectedUsers.length >= 1) {
      setIsGroup(true);
    }
  };

  const handleRemoveUser = (userId: string) => {
    const newSelected = selectedUsers.filter((u) => getUserId(u) !== userId);
    setSelectedUsers(newSelected);
    
    // Disable group mode if only 1 user left
    if (newSelected.length <= 1) {
      setIsGroup(false);
    }
  };

  const handleCreateConversation = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one person");
      return;
    }

    if (isGroup && !groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    setIsLoading(true);

    try {
      // Import the server actions
      const { createConversationAction, getUserPublicKeysAction } = await import(
        "@/lib/messaging/create-conversation.actions"
      );
      const { generateConversationKey } = await import("@/lib/crypto/generateKey");
      const { encryptConversationKey } = await import(
        "@/lib/crypto/encryptConversationKey"
      );
      const { storeConversationKey } = await import("@/lib/crypto/keyStorage");
      const { relatedUserToActorRef } = await import("@/lib/messaging/user-helpers");

      // Get public keys for selected users
      const userIds = selectedUsers.map(getUserId);
      const publicKeysResponse = await getUserPublicKeysAction(userIds);

      // Generate symmetric key for conversation
      const symmetricKey = await generateConversationKey();

      // Encrypt key for each participant
      const encrypted_keys = await Promise.all(
        publicKeysResponse.public_keys.map(async (item: any) => {
          const user = selectedUsers.find((u) => getUserId(u) === item.user_id);
          if (!user) throw new Error(`User not found: ${item.user_id}`);

          const encrypted_key = await encryptConversationKey(
            symmetricKey,
            item.public_key
          );

          return {
            user_id: item.user_id,
            user_role: user.user_type,
            encrypted_key,
          };
        })
      );

      // Convert RelatedUser[] to ActorRef[]
      const participants = selectedUsers.map(relatedUserToActorRef);

      // Create conversation via server action
      const response = await createConversationAction({
        participants,  // Now sending ActorRef[]
        is_group: isGroup,
        name: isGroup ? groupName : undefined,
        encrypted_keys,
      });

      const conversation = response.conversation;

      // Store symmetric key locally
      await storeConversationKey(conversation._id, symmetricKey, 1);

      toast.success("Conversation created successfully!");

      // Navigate to the new conversation
      router.push(`/m/${conversation._id}`);

      // Reset and close
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to create conversation:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create conversation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedUsers([]);
    setSearchQuery("");
    setIsGroup(false);
    setGroupName("");
    setInitialMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button library="daisy" variant="info">
            <LuMessageCircle />
            Start conversation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start a new conversation</DialogTitle>
          <DialogDescription>
            Select people to start a conversation with
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div
                  key={getUserId(user)}
                  className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <span>{getUserDisplayName(user)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(getUserId(user))}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <LuX className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* User Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search people</Label>
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {/* Search Results */}
            {searchQuery && (
              <div className="border rounded-md max-h-48 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">
                    <div className="loading loading-spinner loading-sm"></div>
                    <span className="ml-2">Searching...</span>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">
                    {searchQuery.length < 2
                      ? "Type at least 2 characters to search"
                      : "No users found"}
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <button
                      key={getUserId(user)}
                      type="button"
                      onClick={() => handleSelectUser(user)}
                      className="w-full p-3 hover:bg-accent text-left flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {getUserDisplayName(user).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{getUserDisplayName(user)}</div>
                        <div className="text-xs text-muted-foreground">
                          .{user.user_type}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Group Name (if multiple users) */}
          {isGroup && (
            <div className="space-y-2">
              <Label htmlFor="groupName">Group name</Label>
              <Input
                id="groupName"
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          )}

          {/* Initial Message (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="message">Initial message (optional)</Label>
            <Textarea
              id="message"
              placeholder="Type your message..."
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              resetForm();
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreateConversation}
            disabled={isLoading || selectedUsers.length === 0}
          >
            {isLoading ? "Creating..." : "Start conversation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
