import { UserSmCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { profileRedirects } from "@/lib/hooks/redirect";
import type { CommentWithRelations } from "@/lib/schema/comment/comment";
import type { userRole } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils/format-date";
import { FaEllipsisVertical, FaRegHeart } from "react-icons/fa6";
import LikesDialog from "../dialog/likes-dialog";
import MessageDisplay from "../form/message-input/message-display";

interface CommentCardProps {
  comment?: CommentWithRelations;
  lang: Locale;
}

const CommentCard = ({ comment, lang }: CommentCardProps) => {
  const published = comment?.author_user;
  return (
    <Item className=" flex flex-col gap-2 items-start">
      <ItemHeader className=" w-full">
        <div className=" flex justify-between w-full">
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
            date={comment?.updated_at ? formatTimeAgo(comment.updated_at) : "-"}
            image={published?.image}
          />
          <div className=" flex items-center gap-1">
            <span className="text-sm text-base-content/50">2 hrs ago</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  library="daisy"
                  variant="ghost"
                  size={"sm"}
                  type="button"
                >
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
                  <Button
                    library="daisy"
                    variant="ghost"
                    size={"sm"}
                    type="button"
                    className=" justify-start hover:text-error"
                  >
                    Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ItemHeader>
      <ItemContent>
        {comment ? (
          <MessageDisplay className={cn("")} content={comment?.content} />
        ) : (
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non
            fermentum diam nisl sit amet erat. Duis semper.
          </p>
        )}
        <ItemFooter className=" flex justify-start gap-2">
          <Button
            type="button"
            variant="ghost"
            className=" items-center flex"
            library="daisy"
            size={"sm"}
          >
            <FaRegHeart size={16} />
          </Button>
          {/*GPT can you help me when user click on reply it will add that comment in setReply*/}
          <Button size="sm" library="daisy" variant={"ghost"}>
            Reply
          </Button>
          <LikesDialog dialogTriggerType="text" dialogTriggerSize={"sm"} />
          <Button size="sm" library="daisy" variant={"ghost"}>
            View all replies (2)
          </Button>
        </ItemFooter>
      </ItemContent>
    </Item>
  );
};

export default CommentCard;
