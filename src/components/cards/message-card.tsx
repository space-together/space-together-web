// MessageCard.tsx
// ---------------
// Visual representation of a single chat message within a conversation.

import MyAvatar from "@/components/common/image/my-avatar";
import MyAvatarGroup from "@/components/common/image/my-avatar-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCheck, Smile } from "lucide-react";
import { IoChevronDownOutline } from "react-icons/io5";

interface props {
  sender?: boolean;
  messageCardType?: "group" | "direct";
  messageType?: "TEXT" | "FILE";
  senderName?: string;
  content?: string;
  timestamp?: string;
  fileUrl?: string;
  readBy?: string[];
}

const MessageCard = ({
  sender,
  messageCardType = "group",
  messageType = "TEXT",
  senderName = "Unknown",
  content = "",
  timestamp,
  fileUrl,
  readBy = [],
}: props) => {
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderContent = () => {
    if (messageType === "FILE" && fileUrl) {
      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center gap-2"
        >
          📎 {content || "File attachment"}
        </a>
      );
    }
    return <p className="text-base-content/95 whitespace-pre-wrap">{content}</p>;
  };

  if (messageCardType === "group") {
    return (
      <div className={cn("chat", "chat-start", " w-full max-w-full")}>
        <MyAvatar size="sm" className="chat-image self-start" />
        <div
          className={cn(
            `chat-bubble before:top-0 before:bottom-auto before:mask-[1px_0px] `,
            "max-w-full bg-base-100 flex flex-col gap-2  rounded-(--radius-field)",
          )}
        >
          <div className=" flex justify-between w-full items-center">
            <div className=" flex flex-row gap-2 items-center">
              <h6 className=" font-medium ">{senderName}</h6>
              <time className="text-xs opacity-50">{formatTime(timestamp)}</time>
            </div>
          </div>
          {renderContent()}

          <div className="  flex justify-between items-center">
            <div>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="items-center"
                library="daisy"
              >
                <IoChevronDownOutline /> <Smile size={16} />
              </Button>

              <Button
                variant={"ghost"}
                size={"sm"}
                className="items-center"
                library="daisy"
              >
                Reply
              </Button>
            </div>
            {readBy.length > 0 && (
              <div className=" flex items-center gap-2">
                <span className=" text-base-content/50 text-sm">Seen by:</span>
                <div title={`Seen by ${readBy.length} people`} className=" ">
                  {<MyAvatarGroup size="2xs" items={readBy.slice(0, 4).map(() => ({}))} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("chat group", sender ? "chat-end" : "chat-start")}>
      <div className="chat-bubble items-center bg-base-100  before:top-0 before:bottom-auto before:mask-[1px_0px] rounded-(--radius-field)">
        {renderContent()}

        <div className="  flex justify-between items-center">
          <div className="group-hover:opacity-100 opacity-0 duration-200 ">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="items-center"
              library="daisy"
            >
              <IoChevronDownOutline /> <Smile size={16} />
            </Button>

            <Button
              variant={"ghost"}
              size={"sm"}
              className="items-center"
              library="daisy"
            >
              Reply
            </Button>
          </div>
          <div className=" flex items-center  gap-2">
            <time className="text-xs opacity-50">{formatTime(timestamp)}</time>
            {sender && <CheckCheck size={16} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
