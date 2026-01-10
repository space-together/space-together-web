import type { Announcement } from "@/app/[lang]/(application)/s-t/announcements/_schema/announcement";
import type { AuthContext } from "@/lib/utils/auth-context";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import CommentsDialog from "../common/dialog/comments-dialog";
import LikesDialog from "../common/dialog/likes-dialog";
import ReadDialog from "../common/dialog/read-dialog";
import MyAvatar from "../common/image/my-avatar";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

type components = "like" | "comment" | "save" | "share" | "read";

interface propsPostCardFooter {
  enabledComponents?: components[];
  isCommentOpen?: boolean;
  auth: AuthContext;
  announcement?: Announcement;
}

const PostCardFooter = ({
  enabledComponents = ["save", "comment", "like", "share", "read"],
  isCommentOpen,
  auth,
  announcement,
}: propsPostCardFooter) => {
  return (
    <CardFooter className=" flex flex-col justify-start items-start [.border-t]:pt-2">
      <div className="flex justify-between py-2 w-full">
        <div className=" flex items-center">
          {enabledComponents.includes("like") && (
            <Button title="Like" library="daisy" variant="ghost" size="md">
              <FaRegHeart size={20} />
              <span className=" sr-only">43 Likes</span>
            </Button>
          )}
          {enabledComponents.includes("read") && <ReadDialog />}
          {!isCommentOpen && enabledComponents.includes("comment") && (
            <CommentsDialog
              announcement={announcement}
              dialogTriggerType="icon"
              auth={auth}
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
      <div className="   space-y-2">
        {enabledComponents.includes("like") && (
          <LikesDialog dialogTriggerType="groupUsers" />
        )}
        {!isCommentOpen && enabledComponents.includes("comment") && (
          <div className=" flex gap-2">
            <MyAvatar size="xs" />
            <div>
              <div className=" flex flex-row items-center gap-2">
                <h6 className=" font-medium">Sender comment</h6>
                <span className=" text-xs">1 hour ago</span>
              </div>
              <p className=" text-sm line-3">
                lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatum.
              </p>
            </div>
          </div>
        )}
        {!isCommentOpen && enabledComponents.includes("comment") && (
          <CommentsDialog
            announcement={announcement}
            dialogTriggerType="button"
            auth={auth}
          />
        )}
      </div>
    </CardFooter>
  );
};

export default PostCardFooter;
