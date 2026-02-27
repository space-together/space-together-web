// MessagesAside.tsx
// ------------------
// Sidebar container for the messaging feature. Rendered on every page under the
// `/[lang]/m` route.  Holds the conversation list and navigation controls.
//
// **Usage:** Imported by `src/app/[lang]/(application)/m/layout.tsx` and displayed
// alongside the main conversation content.  The backend should supply a list of
// conversations (via REST or websocket) that populate `MessageUserCard` entries.
//
// This component itself is stateless; data is passed down to `MessageAsideBody`.
// Real‑time updates are expected to come from a WebSocket channel managed by
// `RealtimeProvider` (see docs/MESSAGING_IMPLEMENTATION.md).

import type { Locale } from "@/i18n";
import MessageAsideBody from "./message-aside-body";
import MessagesAsideNavbar from "./message-aside-navbar";

// import AsideSearch from "@/components/cards/aside-search";

interface props {
  lang: Locale;
}

const MessagesAside = ({ lang }: props) => {
  return (
    <aside className=" w-80 bg-base-200 flex left-0 z-40">
      <div className="w-full border-r border-r-base-content/20">
        {/* <AsideSearch /> */}
        <MessagesAsideNavbar />
        <div className=" max-h-[75vh] overflow-y-auto">
          <MessageAsideBody lang={lang} />
        </div>
        <div />
      </div>
    </aside>
  );
};

export default MessagesAside;
