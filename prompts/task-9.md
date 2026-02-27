# Secure Messaging Logic 
Before writing any code:

1. Read the Messaging API examples carefully.
2. Follow existing frontend structure:

   * `/[lang]/m/layout.tsx`
   * `/[lang]/m/page.tsx` 
   * `/[lang]/m/[conversationId]/page.tsx` 
   * `/[lang]/m/[conversationId]/files/page.tsx`
   * `MessageConversationPage`
   * `ConversationBody`
   * `MessagesAside`
   * `MessageFooter`
   * `MessageCard`
   * Sidebar components
3. Do NOT redesign UI.
4. Add logic only.
5. Use existing `RealtimeProvider` if available.
6. Do NOT store plaintext messages in localStorage.
7. Store encryption keys in IndexedDB only.

---

# 🎯 GOAL

Implement:

1. Conversation fetch logic
2. Message fetch + pagination
3. WebSocket real-time connection
4. End-to-end encryption (Web Crypto API)
5. File message handling
6. Read receipts
7. Reconnection logic
8. Offline queue
9. Security best practices

---

# 1️⃣ Create Messaging Service Layer

Create:

```
src/lib/messaging/
   messaging.api.ts
   messaging.socket.ts
   messaging.crypto.ts
   messaging.store.ts
```

Do not mix logic inside components.

---

# 2️⃣ REST API CLIENT (messaging.api.ts)

Implement:

### getConversations(page, limit)

GET `/m/conversations`

### getConversationMessages(conversationId, page, limit)

GET `/m/conversations/{id}/messages`

### createConversation(payload)

POST `/m/conversations`

### sendMessage(conversationId, payload)

POST `/m/conversations/{id}/messages`

### getConversationKey(conversationId)

GET `/m/conversations/{id}/key`

All requests:

* Include JWT from auth provider.
* Handle 401, 403 gracefully.
* Throw structured error objects.

---

# 3️⃣ END-TO-END ENCRYPTION (messaging.crypto.ts)

Use Web Crypto API.

Implement:

### generateSymmetricKey()

AES-256-GCM

### encryptMessage(plainText, key)

Return:

```
{
  encrypted_payload,
  nonce
}
```

### decryptMessage(encrypted_payload, nonce, key)

Return plaintext.

### encryptConversationKeyForUser(userPublicKey, symmetricKey)

Use RSA-OAEP.

### decryptConversationKey(encryptedKey, privateKey)

Private key stored securely in IndexedDB.

---

# 4️⃣ KEY STORAGE (IndexedDB)

Create secure key storage:

```
conversation_keys
private_key
public_key
```

Never use localStorage.

On login:

* Generate RSA keypair if not exists.
* Store in IndexedDB.
* Upload public key to backend (if needed).

---

# 5️⃣ WEBSOCKET CLIENT (messaging.socket.ts)

Implement:

```
connectToConversation(conversationId)
disconnect()
sendPing()
```

WebSocket URL:

```
ws://localhost:4646/m/ws/{conversationId}
```

Pass JWT via:

* Cookie
  OR
* Query param ?token=

---

### On open:

* Start ping interval (every 30 seconds)

### On message:

Switch by `type`:

* message_created
* message_read
* message_deleted
* pong

For `message_created`:

1. Fetch message via REST
2. Decrypt message
3. Append to state

---

### On close:

* Retry after 5 seconds
* Max retry 5 times
* Show reconnecting indicator

---

# 6️⃣ Conversation Page Integration

Inside `MessageConversationPage`:

### On mount:

1. Fetch conversation metadata
2. Fetch encrypted conversation key
3. Decrypt key using private key
4. Store symmetric key in memory
5. Fetch initial messages
6. Decrypt all messages
7. Connect WebSocket

### On unmount:

* Disconnect WebSocket
* Clear symmetric key from memory

---

# 7️⃣ Sending Message Logic

Inside `MessageInput` onSend:

1. Generate UUID v4 as `client_message_id`
2. Encrypt message using symmetric key
3. POST to `/m/conversations/{id}/messages`
4. Optimistically render message
5. If API fails:

   * Mark as failed
   * Retry option

---

# 8️⃣ File Message Logic

Flow:

1. Upload file to Cloudinary
2. Encrypt file name
3. Send message with:

   * encrypted_payload (file name encrypted)
   * file_url
   * file_public_id

Display:

* File icon
* Download link

---

# 9️⃣ Read Receipt

When conversation visible:

After decrypting messages:

Send:

```
POST /m/conversations/{id}/read
```

Or emit socket event.

On receiving:

```
message_read
```

Update message UI state.

---

# 🔟 Sidebar Real-Time Update

When receiving:

```
message_created
```

If conversation not active:

* Update sidebar preview
* Increase unread counter

---

# 1️⃣1️⃣ Offline Queue

If WebSocket disconnected:

* Store unsent messages in memory queue
* Retry when connection restored
* Keep encrypted payload only
* Never store plaintext

---

# 1️⃣2️⃣ Security Best Practices

Implement:

* Clear decrypted plaintext from memory after render
* Do not log decrypted content
* Validate file size before upload
* Use WSS in production
* Handle duplicate client_message_id gracefully
* Reject sending if symmetric key not loaded
* Lock UI if encryption fails

---

# 1️⃣3️⃣ Pagination

On scroll top:

Load next page:

GET `/m/conversations/{id}/messages?page=2`

Decrypt only new batch.

---

# 1️⃣4️⃣ Error Handling

Handle:

401 → redirect login
403 → show “Not a participant”
400 duplicate → ignore
payload too large → show error

---

# 1️⃣5️⃣ Performance Optimization

* Decrypt lazily
* Use memoization for message list
* Avoid full rerender on every socket event
* Virtualize long message lists

---

# 🎯 EXPECTED RESULT

After implementation:

Space-Together messaging frontend will:

* Fully encrypted (E2EE)
* Real-time via WebSocket
* Secure key storage
* Replay safe
* Tenant isolated
* File-supported
* Read receipts working
* Offline resilient
* Production ready
