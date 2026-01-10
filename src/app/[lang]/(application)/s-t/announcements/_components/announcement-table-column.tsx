"use client";
import { UserSmCard } from "@/components/cards/user-card";
import type { Locale } from "@/i18n";
import type { ColumnDef } from "@tanstack/react-table";
import type { AnnouncementWithRelations } from "../_schema/announcement";

export const AnnouncementTableColumn = (
  lang: Locale,
): ColumnDef<AnnouncementWithRelations>[] => {
  return [
    {
      header: "Announcement",
      accessorKey: "content",
      meta: { filterVariant: "text" },
      cell: ({ row }) => {
        const published = row.original?.published_user;
        return (
          <div className="">
            <UserSmCard
              link={`/${lang}/p/${published?.user_type === "STUDENT" ? "s" : published?.user_type === "TEACHER" ? "t" : "s-t"}/${published?._id}`}
              image={published?.image}
              name={published?.name ?? "Sender name"}
              role={published?.user_type}
            />
            <div>
              <p className="text-sm">{row.original.content}</p>
            </div>
          </div>
        );
      },
    },
  ];
};
