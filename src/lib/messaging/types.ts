// types.ts
// Type definitions for messaging system

export interface Conversation {
  _id: string;
  participants: Participant[];
  is_group: boolean;
  name?: string;
  last_message?: Message;
  unread_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Participant {
  user_id: string;
  username: string;
  full_name: string;
  avatar?: string;
  joined_at: string;
}

export interface Message {
  _id: string;
  conversation_id: string;
  sender_id: string;
  sender_username: string;
  sender_full_name: string;
  encrypted_payload: string;
  nonce: string;
  key_version: number;
  message_type: "TEXT" | "FILE";
  file_url?: string;
  file_public_id?: string;
  client_message_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  read_by?: string[];
}

export interface DecryptedMessage extends Omit<Message, "encrypted_payload"> {
  content: string;
}

export interface CreateConversationPayload {
  participants: string[];
  is_group: boolean;
  name?: string;
  encrypted_keys: EncryptedKey[];
}

export interface EncryptedKey {
  user_id: string;
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
