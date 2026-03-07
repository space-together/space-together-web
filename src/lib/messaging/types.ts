// types.ts
// Type definitions for messaging system matching backend API

import type { ActorRef, RelatedUser } from "@/lib/schema/common-schema";

// Base conversation structure (as stored in DB)
export interface Conversation {
  _id: string;
  school_id?: string;
  participants: ActorRef[];  // Simple id + role references
  is_group: boolean;
  name?: string;
  encryption_key_version: number;
  created_at: string;
  updated_at: string;
}

// Conversation with populated user data (from API responses)
export interface ConversationWithRelations extends Conversation {
  participants_users: RelatedUser[];  // Populated user data
  last_message_preview?: string;
  unread_count?: number;
}

// Base message structure (as stored in DB)
export interface Message {
  _id: string;
  school_id?: string;
  conversation_id: string;
  sender: ActorRef;  // Simple id + role reference
  encrypted_payload: string;
  nonce: string;
  key_version: number;
  message_type: "TEXT" | "FILE" | "SYSTEM";
  file_url?: string;
  file_public_id?: string;
  read_by: RelatedUser[];
  client_message_id: string;
  deleted_at?: string;
  created_at: string;
}

// Message with populated sender data (from API responses)
export interface MessageWithRelations extends Message {
  sender_user?: RelatedUser;  // Populated user data
}

export interface DecryptedMessage extends Omit<MessageWithRelations, "encrypted_payload"> {
  sender_full_name: React.ReactNode;
  content: string;
}

// Payload for creating conversations
export interface CreateConversationPayload {
  participants: ActorRef[];  // Send simple references
  is_group: boolean;
  name?: string;
  encrypted_keys: EncryptedKey[];
}

export interface EncryptedKey {
  user_id: string;
  user_role: string;
  encrypted_key: string;
}

export interface SendMessagePayload {
  encrypted_payload: string;
  nonce: string;
  key_version: number;
  message_type: "TEXT" | "FILE";
  file_url?: string;
  file_public_id?: string;
  client_message_id: string;
}

export interface ConversationKeyResponse {
  conversation_id: string;
  encrypted_key_for_user: string;
  key_version: number;
}

export interface WebSocketMessage {
  type: "message_created" | "message_read" | "message_deleted" | "pong";
  data: any;
}
