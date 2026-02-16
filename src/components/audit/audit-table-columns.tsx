"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export interface AuditLog {
  _id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  created_at: string;
  user_role: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export const createAuditTableColumns = (
  onViewDetails: (log: AuditLog) => void,
): ColumnDef<AuditLog>[] => [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return (
        <div className="text-sm">
          <div className="font-medium">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-xs text-muted-foreground">
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user;
      if (!user) {
        return <span className="text-muted-foreground text-sm">Unknown</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <MyAvatar
            src={user.image}
            alt={user.name}
            size="sm"
            type="cycle"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user_role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.user_role;
      const roleVariant = role === "ADMIN" ? "primary" : role === "TEACHER" ? "info" : "secondary";
      return (
        <Badge library="daisy" variant={roleVariant} size="sm">
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <span className="text-sm font-mono">{row.original.action}</span>
    ),
  },
  {
    accessorKey: "entity_type",
    header: "Entity Type",
    cell: ({ row }) => (
      <Badge library="daisy" variant="outline" size="sm">
        {row.original.entity_type}
      </Badge>
    ),
  },
  {
    accessorKey: "entity_id",
    header: "Entity ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {row.original.entity_id.slice(0, 8)}...
      </span>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.original.severity;
      const variant = severity === "CRITICAL" ? "error" : severity === "WARNING" ? "warning" : "info";
      return (
        <Badge library="daisy" variant={variant} size="sm">
          {severity}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        library="daisy"
        size="sm"
        variant="ghost"
        onClick={() => onViewDetails(row.original)}
      >
        <Eye className="size-4" />
        View
      </Button>
    ),
  },
];
