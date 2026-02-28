// /[lang]/m/page.tsx
// ------------------
// Entry page for the messaging feature.  Displays a prompt or button to start a
// new conversation if none are selected.  `/m` is the router prefix for all
// message-related screens, so backend links and socket namespaces should be
// organized accordingly (e.g. `/m/conversations`, `namespace /m`).

import { StartConversationDialog } from "@/components/page/messages/start-conversation-dialog";

const MessagesPage = () => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <StartConversationDialog />
    </div>
  );
};

export default MessagesPage;
