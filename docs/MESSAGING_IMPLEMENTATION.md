# Messaging Feature Implementation (Frontend)

This document describes how the messaging portion of the application is
structured on the frontend, what components are involved, and what the backend
must provide in order for the feature to function correctly.  All message
routes live under the `/m` prefix (e.g. `/en/m`, `/fr/m`).

---

## Routes & Layouts

| Path | Description |
|------|-------------|
| `/[lang]/m` | Root of the messaging system; shows conversation list or a "Start conversation" prompt. |
| `/[lang]/m/[conversationId]` | Individual conversation page. Includes the message history and input box. |
| `/[lang]/m/[conversationId]/files` | (Placeholder) view for shared files within a conversation.

**Important**: the routing is defined under `src/app/[lang]/(application)/m`.
The top‑level `layout.tsx` ensures authentication and renders a two‑column layout
with `MessagesAside` on the left. Child layouts/pages load the conversation
navbar, body, and footer as necessary.

The backend should expose REST endpoints for obtaining:

1. List of conversations for the current user (`GET /m/conversations`).
2. Single conversation metadata (`GET /m/conversations/:id`).
3. Message list for conversation (`GET /m/conversations/:id/messages`).
4. File list (`GET /m/conversations/:id/files`).
5. Endpoints to post new messages, create conversations, upload files, etc.

Additionally, a real‑time transport (WebSocket or similar) must be available
so the frontend can join a room for each conversation and receive events such as
`message.created`, `message.updated`, `conversation.participant_added`, etc.
The existing `RealtimeProvider`/`useRealtimeData` infrastructure is intended for
this purpose.

---

## Component Hierarchy

```
App
└─ /[lang]/m/layout.tsx
   ├─ MessagesAside (sidebar)
   │  ├─ MessagesAsideNavbar
   │  └─ MessageAsideBody
   │     ├─ MessageUserCard* (list item)
   └─ <children> (either MessagesPage or ConversationLayout)

ConversationLayout
├─ ConversationNavbar
└─ <children> (ConversationPage)
   ├─ ConversationBody
   │  └─ MessageCard* (message bubble)
   └─ MessageFooter
      └─ MessageInput
         ├─ Toolbar
         ├─ EmojiPickerButton
         └─ MentionPickerButton
```

(*) These components are currently presentational with hard‑coded placeholders.
Comments have been added to each file explaining the expected props and
backend contract.

---

## Data Flow & Realtime

1. **Initial load**: when the user navigates to `/m`, the layout requests the
   conversation list from the REST API and possibly hydrates the data into the
   sidebar. Navigating to a conversation fetches its historical messages.
2. **Realtime updates**: upon entering a conversation page, the frontend should
   open a websocket (or reuse the global socket provided by `RealtimeProvider`)
   and `subscribe` to a channel identified by the `conversationId`.
   Events from the server will update the UI via hooks like `useRealtimeData`
   or custom state management. For example, receiving a
   `message.created` event should append a `MessageCard` to
   `ConversationBody`, and a `conversation.updated` event should refresh the
   corresponding `MessageUserCard` in the sidebar.
3. **Sending messages**: the `MessageInput` component calls an `onSend`
   callback. The parent should emit the message over the websocket (or POST to
   `/m/conversations/:id/messages`), and the backend should broadcast the new
   message back to all subscribers, including the sender.

_Side note:_ the current input component returns HTML strings; the backend must
sanitize/encode these or store them as text with markdown.

---

## Backend Requirements

- **WebSocket namespace** `/m` or equivalent.  Subscriptions keyed by
  conversation ID.
- Emit events: `conversation.created`, `message.created`, `message.read`, etc.
- Provide REST fallback for clients that cannot open sockets.
- Authentication tokens must be sent on socket connect and HTTP headers.
- Payload shape example:
  ```json
  {
    "_id": "abc123",
    "type": "message.created",
    "conversationId": "conv456",
    "data": {
      "_id": "msg789",
      "senderId": "user1",
      "content": "<p>Hello!</p>",
      "createdAt": "2026-02-27T10:00:00Z"
    }
  }
  ```
- Ensure ordering and delivery guarantees appropriate for chat.

---

## Notes for Backend Team

- All frontend components are currently stubbed with static text; please refer
  to the comments added at the top of each component file for details on what
  data they expect and how they are supposed to be wired.
- We deliberately kept the message router under `/m` so that other areas of the
  app (e.g. `/app` or `/admin`) are unaffected.  When returning links in API
  responses, use that base.
- The UI was written with performance in mind; reconnections should be handled
  gracefully by the `RealtimeProvider` (see `src/lib/providers/RealtimeProvider.tsx`).

By reading this document and the inline comments you should have a complete
picture of how the messaging frontend is constructed and what services the
backend must expose to make it work quickly and reliably.
