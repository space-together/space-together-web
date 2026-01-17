import { UserSmCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Locale } from "@/i18n";
import { profileRedirects } from "@/lib/hooks/redirect";
import type { RelatedUser } from "@/lib/schema/common-schema";
import MyAvatarGroup from "../image/my-avatar-group";

interface AnnouncementDialogMetionProps {
  metion: RelatedUser[];
  lang: Locale;
}

const AnnouncementDialogMetion = ({
  metion,
  lang,
}: AnnouncementDialogMetionProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-4 mt-2 flex flex-wrap gap-2 w-fit cursor-pointer">
          <h6 className="sm">Mention:</h6>
          <MyAvatarGroup
            size="2xs"
            type="square"
            items={metion.map((user) => ({
              alt: user.name,
              src: user.image,
            }))}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mention</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {metion.map((user) => (
            <UserSmCard
              key={user._id}
              name={user.name}
              image={user.image}
              avatarProps={{ size: "sm" }}
              role={user.user_type}
              link={profileRedirects({
                lang,
                id: user._id || user.id || "",
                role:
                  user.user_type === "USER" ? "SCHOOLSTAFF" : user.user_type,
              })}
            />
          ))}
        </div>
        <DialogFooter className=" flex flex-flex-row justify-between">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDialogMetion;
