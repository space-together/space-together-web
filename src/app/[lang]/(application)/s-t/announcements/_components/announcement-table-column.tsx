"use client";

import { UserSmCard } from "@/components/cards/user-card";
import AnnouncementDialogMetion from "@/components/common/dialog/announcement-dialog-metion";
import CommentsDialog from "@/components/common/dialog/comments-dialog";
import LikesDialog from "@/components/common/dialog/likes-dialog";
import type { Locale } from "@/i18n";
import { profileRedirects } from "@/lib/hooks/redirect";
import type { userRole } from "@/lib/schema/common-details-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatTimeAgo } from "@/lib/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import type { AnnouncementWithRelations } from "../_schema/announcement";

export const AnnouncementTableColumn = (
  lang: Locale,
  auth: AuthContext,
): ColumnDef<AnnouncementWithRelations>[] => {
  return [
    {
      header: "Announcement",
      accessorKey: "content",
      meta: { filterVariant: "text" },

      cell: ({ row }) => {
        const announcement = row.original;
        const published = announcement?.published_user;
        return (
          <div className="flex flex-col gap-2">
            <div className=" flex flex-row items-center justify-between">
              <UserSmCard
                link={
                  published
                    ? profileRedirects({
                        lang,
                        role: published.user_type as userRole,
                        id: published._id || "",
                      })
                    : undefined
                }
                image={published?.image}
                name={published?.name ?? "Published user"}
                role={published?.user_type ?? "-"}
                date={
                  announcement?.updated_at
                    ? formatTimeAgo(announcement.updated_at)
                    : undefined
                }
              />
              <div className="flex flex-row gap-2">
                {announcement?.mentioned_users &&
                  announcement.mentioned_users.length > 0 && (
                    <AnnouncementDialogMetion
                      lang={lang}
                      metion={announcement.mentioned_users}
                    />
                  )}
                <div className="flex flex-row gap-2 items-center">
                  <LikesDialog
                    auth={auth}
                    lang={lang}
                    target_id={row.original._id}
                    dialogTriggerType="groupUsers"
                  />
                </div>
              </div>
            </div>

            {/* Content preview */}
            {announcement?.content ? (
              <p className="text-sm line-clamp-3 text-base-content/80">
                {announcement.content}
              </p>
            ) : (
              <p className="text-sm italic opacity-60">
                No announcement content
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-row gap-2 items-center">
              <LikesDialog
                auth={auth}
                lang={lang}
                target_id={row.original._id}
                likeButton
              />
              <CommentsDialog
                announcement={row.original}
                auth={auth}
                lang={lang}
                dialogTriggerType="icon"
              />
              <div className="flex gap-3 text-xs opacity-60">
                {announcement?.mentioned_users?.length ? (
                  <span>Mentions: {announcement.mentioned_users.length}</span>
                ) : null}
              </div>
            </div>
          </div>
        );
      },
    },
  ];
};
