"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Announcement } from "@/lib/schema/parent/parent-schema";
import { formatDistanceToNow } from "date-fns";

interface ParentAnnouncementCardProps {
  announcement: Announcement;
}

export default function ParentAnnouncementCard({
  announcement,
}: ParentAnnouncementCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{announcement.title}</CardTitle>
          {announcement.priority && (
            <span
              className={`badge badge-sm ${
                announcement.priority === "HIGH"
                  ? "badge-error"
                  : announcement.priority === "MEDIUM"
                    ? "badge-warning"
                    : "badge-info"
              }`}
            >
              {announcement.priority}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(announcement.created_at), {
            addSuffix: true,
          })}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{announcement.content}</p>
      </CardContent>
    </Card>
  );
}
