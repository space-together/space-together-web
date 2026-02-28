Here's a comprehensive guide on how the frontend can create a new conversation using the API:

## Frontend Implementation Guide for Creating Conversations

### 1. **API Endpoint**
```
POST /conversations
```

### 2. **Required Headers**

```typescript
{
  "Authorization": "Bearer <jwt_token>",        // Required: User authentication
  "School-Token": "<school_token>",             // Optional: For school-specific conversations
  "Content-Type": "application/json"
}
```

### 3. **Request Body Structure**

```typescript
interface CreateConversationRequest {
  participants: RelatedUser[];           // Array of participants (min 2 for direct, min 3 for group)
  is_group: boolean;                     // true for group chat, false for direct message
  name?: string;                         // Optional: Group name (required for groups)
  encrypted_keys: EncryptedKeyForUser[]; // Encryption keys for each participant
}

interface RelatedUser {
  user: {
    id: string;        // User's ObjectId
    name: string;
    email: string;
    image?: string;
  };
  role: "STUDENT" | "TEACHER" | "PARENT" | "ADMIN" | "STAFF";
}

interface EncryptedKeyForUser {
  user_id: string;     // User's ObjectId
  user_role: "STUDENT" | "TEACHER" | "PARENT" | "ADMIN" | "STAFF";
  encrypted_key: string; // Encrypted conversation key for this user
}
```

### 4. **Frontend Implementation Examples**

#### **Example 1: Create Direct Message (School Context)**
```typescript
// For conversations within a school (teacher-student, student-student)
async function createDirectMessage(
  currentUser: User,
  otherUser: User,
  schoolToken: string,
  jwtToken: string
) {
  // Generate encryption key for the conversation
  const conversationKey = generateEncryptionKey(); // Your crypto library
  
  // Encrypt the key for each participant using their public keys
  const encryptedKeyForCurrentUser = encryptWithPublicKey(
    conversationKey,
    currentUser.publicKey
  );
  const encryptedKeyForOtherUser = encryptWithPublicKey(
    conversationKey,
    otherUser.publicKey
  );

  const requestBody = {
    participants: [
      {
        user: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image
        },
        role: currentUser.role
      },
      {
        user: {
          id: otherUser.id,
          name: otherUser.name,
          email: otherUser.email,
          image: otherUser.image
        },
        role: otherUser.role
      }
    ],
    is_group: false,
    encrypted_keys: [
      {
        user_id: currentUser.id,
        user_role: currentUser.role,
        encrypted_key: encryptedKeyForCurrentUser
      },
      {
        user_id: otherUser.id,
        user_role: otherUser.role,
        encrypted_key: encryptedKeyForOtherUser
      }
    ]
  };

  const response = await fetch('https://api.example.com/conversations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'School-Token': schoolToken,  // School-specific conversation
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error('Failed to create conversation');
  }

  return await response.json();
}
```

#### **Example 2: Create Group Chat (School Context)**
```typescript
async function createGroupChat(
  currentUser: User,
  members: User[],
  groupName: string,
  schoolToken: string,
  jwtToken: string
) {
  const conversationKey = generateEncryptionKey();
  
  // Include current user in participants
  const allParticipants = [currentUser, ...members];
  
  const requestBody = {
    participants: allParticipants.map(user => ({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      },
      role: user.role
    })),
    is_group: true,
    name: groupName,
    encrypted_keys: allParticipants.map(user => ({
      user_id: user.id,
      user_role: user.role,
      encrypted_key: encryptWithPublicKey(conversationKey, user.publicKey)
    }))
  };

  const response = await fetch('https://api.example.com/conversations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'School-Token': schoolToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  return await response.json();
}
```

#### **Example 3: Create Cross-School Conversation (Admin-to-Admin)**
```typescript
// For conversations between admins or users from different schools
async function createCrossSchoolConversation(
  currentUser: User,
  otherAdmin: User,
  jwtToken: string
) {
  const conversationKey = generateEncryptionKey();

  const requestBody = {
    participants: [
      {
        user: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image
        },
        role: currentUser.role
      },
      {
        user: {
          id: otherAdmin.id,
          name: otherAdmin.name,
          email: otherAdmin.email,
          image: otherAdmin.image
        },
        role: otherAdmin.role
      }
    ],
    is_group: false,
    encrypted_keys: [
      {
        user_id: currentUser.id,
        user_role: currentUser.role,
        encrypted_key: encryptWithPublicKey(conversationKey, currentUser.publicKey)
      },
      {
        user_id: otherAdmin.id,
        user_role: otherAdmin.role,
        encrypted_key: encryptWithPublicKey(conversationKey, otherAdmin.publicKey)
      }
    ]
  };

  const response = await fetch('https://api.example.com/conversations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      // NO School-Token header = main database (cross-school)
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  return await response.json();
}
```

### 5. **React/Vue Component Example**

```typescript
// React example
import { useState } from 'react';

function CreateConversationButton({ otherUser, schoolToken, jwtToken }) {
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser(); // Your auth hook

  const handleCreateConversation = async () => {
    setLoading(true);
    try {
      const conversation = await createDirectMessage(
        currentUser,
        otherUser,
        schoolToken,
        jwtToken
      );
      
      // Navigate to the conversation
      navigate(`/conversations/${conversation.id}`);
    } catch (error) {
      console.error('Failed to create conversation:', error);
      alert('Failed to start conversation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCreateConversation} disabled={loading}>
      {loading ? 'Creating...' : 'Send Message'}
    </button>
  );
}
```

### 6. **Important Validation Rules**

- ✅ **Direct messages**: Exactly 2 participants
- ✅ **Group chats**: Minimum 3 participants
- ✅ **Current user must be in participants list**
- ✅ **Each participant needs an encrypted key**
- ✅ **School-Token header determines database routing**:
  - With School-Token → School database
  - Without School-Token → Main database

### 7. **Response Structure**

```typescript
interface ConversationResponse {
  id: string;                    // MongoDB ObjectId
  school_id?: string;            // Present if school-specific
  participants: RelatedUser[];
  is_group: boolean;
  name?: string;
  encryption_key_version: number;
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
}
```

### 8. **Error Handling**

```typescript
try {
  const conversation = await createConversation(...);
} catch (error) {
  if (error.status === 400) {
    // Validation errors:
    // - Wrong number of participants
    // - Current user not in participants
    // - Invalid user IDs
  } else if (error.status === 401) {
    // Authentication failed - redirect to login
  } else if (error.status === 500) {
    // Server error - retry or show error message
  }
}
```

This implementation ensures end-to-end encryption while supporting both school-specific and cross-school conversations!