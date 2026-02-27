// /[lang]/m/layout.tsx
// --------------------
// Top‑level layout for all routes under `/[lang]/m`.  This file ensures the
// user is authenticated and renders `MessagesAside` (sidebar) alongside any
// child content (conversation list, conversation thread, files).  Backend
// routes will eventually provide the conversation data either via REST
// endpoints or, for better responsiveness, over a websocket channel that
// connects when this layout is mounted.

import MessagesAside from "@/components/page/messages/messages-aside";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface MessageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // ✅ use string, not Locale
}

export default async function MessageLayout({
  children,
  params,
}: MessageLayoutProps) {
  const { lang } = await params;
  const user = await authContext();

  if (!user) {
    redirect(`/${lang}/auth/login`);
  }

  return (
    <section className="w-full flex">
      <MessagesAside lang={lang as Locale} />
      <div className=" flex-1">{children}</div>
    </section>
  );
}
