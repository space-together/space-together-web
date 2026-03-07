# Messaging System Migration Summary

## Overview
Successfully updated the frontend messaging system to align with the backend API breaking changes. The main change is moving from full user objects to simple `ActorRef` references for participants and senders.

## Files Updated

### 1. Type Definitions
**File:** `src/lib/messaging/types.ts`
- Updated `Conversation` to use `ActorRef[]` for participants
- Added `ConversationWithRelations` type for API responses with populated data
- Updated `Message` to use `ActorRef` for sender (changed from `{ sender_id, sender_role }`)
- Added `MessageWithRelations` type for API responses with populated sender data
- Updated `CreateConversationPayload` to use `ActorRef[]`

### 2. Helper Utilities
**File:** `src/lib/messaging/user-helpers.ts` (NEW)
- Created `getUserFromRelatedUser()` - extracts standardized user data from RelatedUser union
- Created `findParticipantUser()` - finds user data from participants_users array
- Created `getOtherParticipant()` - gets the other participant in a direct conversation
- Created `relatedUserToActorRef()` - converts RelatedUser to ActorRef

### 3. Client Auth Utility
**File:** `src/lib/utils/client-auth.ts`
- Added `getCurrentUserId()` function to decode JWT and extract current user ID

### 4. Hooks
**File:** `src/lib/hooks/useConversationsList.ts`
- Updated to use `ConversationWithRelations` type
- Changed response parsing from `response.conversations` to `response.data`

**File:** `src/lib/messaging/useConversations.ts`
- Updated to use `ConversationWithRelations` type
- Changed response structure to use `data` field instead of `conversations`

### 5. Server Actions
**File:** `src/lib/messaging/create-conversation.actions.ts`
- Updated `CreateConversationPayload` to use `ActorRef[]` instead of `RelatedUser[]`
- Changed `user_role` type from `userRole` to `string`

### 6. UI Components
**File:** `src/components/page/messages/message-aside-body.tsx`
- Updated to use `getCurrentUserId()` instead of `useAuth()` hook
- Added logic to extract other participant data using `getOtherParticipant()` helper
- Now passes `profilePicture` to MessageUserCard

**File:** `src/components/cards/message-user-card.tsx`
- Added `profilePicture` prop
- Updated to display profile picture in avatar

**File:** `src/components/page/messages/start-conversation-dialog.tsx`
- Updated to convert `RelatedUser[]` to `ActorRef[]` before creating conversation
- Uses `relatedUserToActorRef()` helper for conversion

## Key Changes Summary

### Before
```typescript
// Participants were full user objects
participants: RelatedUser[]

// Sender had separate fields
sender: {
  sender_id: string;
  sender_role: string;
}

// Creating conversation sent full objects
createConversation({ participants: [fullUserObject1, fullUserObject2] })
```

### After
```typescript
// Participants are simple references
participants: ActorRef[]  // { id: string, role: string }

// Sender is a simple reference
sender: ActorRef  // { id: string, role: string }

// Creating conversation sends simple references
createConversation({ participants: [{ id: "123", role: "STUDENT" }] })

// API responses include populated data
interface ConversationWithRelations {
  participants: ActorRef[];
  participants_users: RelatedUser[];  // Populated data
}
```

## Benefits

1. **Smaller Payloads**: Creating conversations now sends minimal data
2. **Consistency**: Same `ActorRef` pattern used across the system
3. **Clear Separation**: Storage format vs display format
4. **Type Safety**: Distinct types for base data and populated data
5. **Better Performance**: More efficient database queries

## Testing Checklist

- [ ] Conversation list displays correctly
- [ ] Direct message names and avatars show properly
- [ ] Group conversations display correctly
- [ ] Creating new conversations works
- [ ] Message sending works
- [ ] Real-time updates work
- [ ] Profile pictures display correctly
- [ ] Current user is correctly identified

## Migration Notes

- The backend automatically populates `participants_users` and `sender_user` in responses
- Frontend should always use the populated data for display
- When creating conversations, convert `RelatedUser` to `ActorRef` using the helper
- The `getCurrentUserId()` function decodes the JWT token client-side
