import type { AnnouncementWithRelations } from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import PostCardFooter from "@/components/cards/post-card-footer";
import { UserSmCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { profileRedirects } from "@/lib/hooks/redirect";
import type { userRole } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatTimeAgo } from "@/lib/utils/format-date";
import { FaEllipsisVertical } from "react-icons/fa6";
import AddAnnouncementDialog from "../dialog/add-announcement-dialog";
import AnnouncementDialogMetion from "../dialog/announcement-dialog-metion";
import DeleteAnnouncementDialog from "../dialog/delete-announcement-dialog";
import MessageDisplay from "../form/message-input/message-display";

interface AnnouncementCardProps {
  isCommentOpen?: boolean;
  auth: AuthContext;
  announcement?: AnnouncementWithRelations;
  lang: Locale;
}

const AnnouncementCard = ({
  auth,
  isCommentOpen,
  announcement,
  lang,
}: AnnouncementCardProps) => {
  const published = announcement?.published_user;
  return (
    <Card
      className={cn(
        isCommentOpen &&
          "border-none border-0 shadow-none p-0 pt-0 pb-0 h-full",
      )}
    >
      <CardHeader className="  flex flex-row items-center justify-between">
        <UserSmCard
          link={
            published
              ? profileRedirects({
                  lang: lang ?? "en",
                  role: published?.user_type as userRole,
                  id: published?._id ?? "",
                })
              : undefined
          }
          role={published?.user_type ?? "-"}
          name={published?.name ?? "Published name"}
          date={
            announcement?.updated_at
              ? formatTimeAgo(announcement.updated_at)
              : "-"
          }
          image={published?.image}
        />
        <div className=" flex items-center gap-1">
          <span className="text-sm text-base-content/50">Announcement</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button library="daisy" variant="ghost" size={"sm"} type="button">
                <FaEllipsisVertical className="text-base-content/50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-2 gap-0 space-y-0">
              <div className="flex flex-col gap-1">
                <Button
                  library="daisy"
                  variant="ghost"
                  size={"sm"}
                  type="button"
                  className=" justify-start"
                >
                  Report
                </Button>
                <Separator />
                <AddAnnouncementDialog
                  lang={lang}
                  auth={auth}
                  button={{
                    library: "daisy",
                    size: "sm",
                    type: "button",
                    className: " justify-start ",
                    variant: "ghost",
                  }}
                  name="Edit"
                  className="  justify-start"
                />
                {announcement && (
                  <DeleteAnnouncementDialog
                    announcement={announcement}
                    auth={auth}
                  />
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full px-0">
        {announcement?.content ? (
          <MessageDisplay
            className={cn("px-4", !isCommentOpen && " max-h-54 ")}
            content={announcement.content}
          />
        ) : (
          <p className={cn(!isCommentOpen && " line-clamp-4 px-4")}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        )}
        <div className=" gap-2 flex flex-col">
          {announcement?.mentioned_users &&
            announcement.mentioned_users.length > 0 && (
              <AnnouncementDialogMetion
                lang={lang}
                metion={announcement.mentioned_users}
              />
            )}
          <PostCardFooter
            lang={lang}
            announcement={announcement}
            enabledComponents={["comment", "like", "save", "share"]}
            isCommentOpen={isCommentOpen}
            auth={auth}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
