# Start Conversation Feature Guide

## Overview
Created a complete dialog system for starting new conversations with user search, selection, and message composition.

## Files Created

### 1. `src/components/page/messages/start-conversation-dialog.tsx`
Main dialog component with:
- User search with debouncing (300ms delay)
- Multi-user selection with visual chips
- Automatic group mode when 2+ users selected
- Group name input for group conversations
- Optional initial message field
- Full encryption support using Web Crypto API

### 2. `src/lib/messaging/users.actions.ts`
Server action for searching users:
- Authenticated API calls using httpOnly cookies
- Search by name or username
- Configurable result limit

### 3. `src/lib/messaging/create-conversation.actions.ts`
Server actions for conversation creation:
- `createConversationAction()` - Creates conversation with auth
- `getUserPublicKeysAction()` - Fetches public keys for encryption

## Features

### User Search
- Type at least 2 characters to search
- Debounced search (300ms)
- Shows loading state while searching
- Filters out already selected users

### User Selection
- Click to add users
- Visual chips showing selected users
- Click X to remove users
- Auto-enables group mode with 2+ users

### Group Conversations
- Automatically enabled when 2+ users selected
- Required group name field
- Optional initial message

### Direct Conversations
- Single user selection
- Optional initial message

### Security
- End-to-end encryption using Web Crypto API
- Symmetric AES-GCM keys for messages
- RSA-OAEP for key exchange
- Keys stored locally in IndexedDB

## Usage

```tsx
import { StartConversationDialog } from "@/components/page/messages/start-conversation-dialog";

// With default button
<StartConversationDialog />

// With custom trigger
<StartConversationDialog>
  <Button>Custom Button</Button>
</StartConversationDialog>
```

## Backend API Requirements

The dialog expects these endpoints:

### 1. User Search
```
GET /users/search?q={query}&limit={limit}
GET /users?limit={limit}

Headers:
- Authorization: Bearer {token}
- School-Token: {school_token}

Response:
{
  "users": [
    {
      "_id": "user_id",
      "username": "username",
      "full_name": "Full Name",
      "avatar": "url",
      "role": "role"
    }
  ]
}
```

### 2. Get Public Keys
```
GET /m/users/public-keys?user_ids=id1,id2,id3

Headers:
- Authorization: Bearer {token}
- School-Token: {school_token}

Response:
{
  "public_keys": [
    {
      "user_id": "user_id",
      "public_key": "-----BEGIN PUBLIC KEY-----..."
    }
  ]
}
```

### 3. Create Conversation
```
POST /m-conversations

Headers:
- Authorization: Bearer {token}
- School-Token: {school_token}

Body:
{
  "participants": ["user_id1", "user_id2"],
  "is_group": false,
  "name": "Group Name", // optional, for groups
  "encrypted_keys": [
    {
      "user_id": "user_id1",
      "encrypted_key": "base64_encrypted_key"
    }
  ]
}

Response:
{
  "conversation": {
    "_id": "conversation_id",
    "participants": [...],
    "is_group": false,
    "created_at": "timestamp"
  }
}
```

## Flow

1. User clicks "Start conversation" button
2. Dialog opens with search field
3. User types to search (debounced)
4. Server action fetches matching users
5. User selects one or more people
6. If 2+ selected, group mode auto-enables
7. User optionally enters group name and message
8. On submit:
   - Fetch public keys for selected users
   - Generate symmetric AES key
   - Encrypt key for each participant using their RSA public key
   - Send to backend via server action
   - Store symmetric key locally
   - Navigate to new conversation

## Next Steps

To complete the messaging system, you may want to:

1. Implement the conversation view (`/m/[conversationId]`)
2. Add message sending with encryption
3. Add message decryption and display
4. Implement real-time updates via WebSocket
5. Add file upload support
6. Add read receipts
7. Add typing indicators

## Notes

- All authentication is handled server-side via httpOnly cookies
- Encryption happens client-side before sending to server
- Server never sees unencrypted message content
- Keys are stored in browser's IndexedDB
