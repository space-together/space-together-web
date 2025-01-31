import { auth } from "@/auth";
import MessagesAside from "@/components/app/messages/messages-aside";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const MessageLayout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <section>
      <div>
        <MessagesAside lang={lang} />
      </div>
      <div className=" pl-80">{children}</div>
    </section>
  );
};

export default MessageLayout;
