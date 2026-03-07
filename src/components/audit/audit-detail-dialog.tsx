"use client";

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AuditLog {
  _id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  created_at: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  user?: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface AuditDetailDialogProps {
  log: AuditLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JsonViewer = ({ data }: { data: any }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderValue = (value: any, key: string, depth = 0): React.ReactNode => {
    if (value === null) return <span className="text-muted-foreground">null</span>;
    if (value === undefined) return <span className="text-muted-foreground">undefined</span>;
    
    if (typeof value === "object" && !Array.isArray(value)) {
      const isExpanded = expanded[key] ?? true;
      return (
        <div className={cn(depth > 0 && "ml-4")}>
          <button
            type="button"
            onClick={() => toggleExpand(key)}
            className="text-primary hover:underline"
          >
            {isExpanded ? "▼" : "▶"} {"{"}
          </button>
          {isExpanded && (
            <div className="ml-4">
              {Object.entries(value).map(([k, v]) => (
                <div key={k} className="my-1">
                  <span className="text-info font-medium">{k}:</span>{" "}
                  {renderValue(v, `${key}.${k}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
          {isExpanded && <span>{"}"}</span>}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return <span className="text-warning">[{value.length} items]</span>;
    }

    if (typeof value === "string") {
      return <span className="text-success">"{value}"</span>;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return <span className="text-warning">{String(value)}</span>;
    }

    return <span>{String(value)}</span>;
  };

  return <div className="text-sm">{renderValue(data, "root")}</div>;
};

export function AuditDetailDialog({
  log,
  open,
  onOpenChange,
}: AuditDetailDialogProps) {
  if (!log) return null;

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "error";
      case "WARNING":
        return "warning";
      case "INFO":
      default:
        return "info";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Audit Log Details</DialogTitle>
          <DialogDescription>
            Complete information about this audit entry
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Action</p>
              <p className="text-sm">{log.action}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Entity Type</p>
              <p className="text-sm">{log.entity_type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Entity ID</p>
              <p className="text-sm font-mono text-xs">{log.entity_id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Severity</p>
              <Badge library="daisy" variant={getSeverityVariant(log.severity)}>
                {log.severity}
              </Badge>
            </div>
          </div>

          {/* User Info */}
          {log.user && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">User</p>
              <div className="bg-base-200 rounded-md p-3">
                <p className="text-sm font-medium">{log.user.name}</p>
                <p className="text-xs text-muted-foreground">{log.user.email}</p>
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
            <p className="text-sm">
              {new Date(log.created_at).toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "long",
              })}
            </p>
          </div>

          {/* IP & User Agent */}
          {(log.ip_address || log.user_agent) && (
            <div className="space-y-2">
              {log.ip_address && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IP Address</p>
                  <p className="text-sm font-mono">{log.ip_address}</p>
                </div>
              )}
              {log.user_agent && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">User Agent</p>
                  <p className="text-xs break-all">
                    {log.user_agent}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Metadata */}
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Metadata (Before/After)
              </p>
              <div className="bg-base-200 rounded-md p-3 overflow-x-auto">
                <JsonViewer data={log.metadata} />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AuditDetailDialogSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
