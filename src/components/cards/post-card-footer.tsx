import type { Announcement } from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Activity } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import CommentsDialog from "../common/dialog/comments-dialog";
import LikesDialog from "../common/dialog/likes-dialog";
import ReadDialog from "../common/dialog/read-dialog";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

type components = "like" | "comment" | "save" | "share" | "read";

interface propsPostCardFooter {
  enabledComponents?: components[];
  isCommentOpen?: boolean;
  auth: AuthContext;
  announcement?: Announcement;
  lang: Locale;
}

const PostCardFooter = ({
  enabledComponents = ["save", "comment", "like", "share", "read"],
  isCommentOpen,
  auth,
  announcement,
  lang,
}: propsPostCardFooter) => {
  const target_id = announcement?._id;
  return (
    <CardFooter className=" flex flex-col justify-start items-start [.border-t]:pt-2">
      <div className="flex justify-between py-2 w-full">
        <div className=" flex items-center">
          {enabledComponents.includes("like") && target_id && (
            <LikesDialog auth={auth} likeButton target_id={target_id} />
          )}
          {enabledComponents.includes("read") && <ReadDialog />}
          {!isCommentOpen && enabledComponents.includes("comment") && (
            <CommentsDialog
              announcement={announcement}
              dialogTriggerType="icon"
              auth={auth}
              lang={lang}
            />
          )}
        </div>
        <div className=" flex items-center">
          <Button title="Share" library="daisy" variant="ghost" size="md">
            <IoMdShare size={20} />
          </Button>
          <Button title="Save" library="daisy" variant="ghost" size="md">
            <FaRegBookmark size={20} />
          </Button>
        </div>
      </div>
      <div className="   gap-2 flex flex-col">
        {enabledComponents.includes("like") && (
          <Activity>
            {target_id && (
              <LikesDialog
                auth={auth}
                lang={lang}
                dialogTriggerType="groupUsers"
                target_id={target_id}
              />
            )}
          </Activity>
        )}
        {!isCommentOpen && enabledComponents.includes("comment") && (
          <Activity>
            <CommentsDialog
              announcement={announcement}
              dialogTriggerType="button"
              auth={auth}
              lang={lang}
            />
          </Activity>
        )}
      </div>
    </CardFooter>
  );
};

export default PostCardFooter;
