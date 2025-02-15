import { auth } from "@/auth";
import ConversationBody from "@/components/app/messages/conversation-body";
import ConversationNavbar from "@/components/app/messages/conversation-navbar";
import MessageFooter from "@/components/app/messages/message-footer";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
 interface props {
  params: Promise<{ lang: Locale }>;
}

const MessageConversationPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" h-[90vh] max-h-[90vh] overflow-y-auto min-h-[90vh] w-full relative">
      <ConversationNavbar lang={lang}/>
      <ConversationBody />
      <MessageFooter />
    </div>
  );
};

export default MessageConversationPage;
