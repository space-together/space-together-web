"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

/* ================================
   Types
================================ */
type RealtimeEvent = {
  entity_type: string;
  event_type: "created" | "updated" | "deleted" | string;
  entity_id?: string;
  data?: Record<string, any>;
  receivedAt: string;
};

type ConnectionStatus =
  | "Disconnected"
  | "Connecting..."
  | "Connected"
  | "Error";

/* ================================
   Page
================================ */
export default function RealtimeTestPage() {
  const [events, setEvents] = useState<RealtimeEvent[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("Disconnected");
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  /* ================= SSE ================= */
  const connectToSSE = () => {
    if (eventSource) return;

    setConnectionStatus("Connecting...");
    const es = new EventSource("http://localhost:4646/events/stream");

    es.onopen = () => setConnectionStatus("Connected");

    es.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setEvents((prev) =>
        [
          {
            ...payload,
            receivedAt: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 15),
      );
    };

    es.onerror = () => {
      setConnectionStatus("Error");
      es.close();
      setEventSource(null);
    };

    setEventSource(es);
  };

  const disconnectFromSSE = () => {
    eventSource?.close();
    setEventSource(null);
    setConnectionStatus("Disconnected");
  };

  useEffect(() => {
    return () => eventSource?.close();
  }, [eventSource]);

  /* ================= Helpers ================= */
  const eventVariant = (type: string) => {
    switch (type) {
      case "created":
        return "success";
      case "updated":
        return "info";
      case "deleted":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const statusColor = () => {
    switch (connectionStatus) {
      case "Connected":
        return "badge-success";
      case "Connecting...":
        return "badge-warning";
      case "Error":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  /* ================= UI ================= */
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">📡 Real-time Event Dashboard</h1>

        <div className="flex items-center gap-3">
          <span className={`badge ${statusColor()}`}>{connectionStatus}</span>

          {!eventSource ? (
            <Button onClick={connectToSSE} variant={"primary"} library="daisy">
              Start Monitor
            </Button>
          ) : (
            <Button variant="error" library="daisy" onClick={disconnectFromSSE}>
              Stop Monitor
            </Button>
          )}
        </div>
      </div>

      {/* ================= Stats ================= */}
      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-title">Total Events</div>
          <div className="stat-value text-primary">{events.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Connection</div>
          <div className="stat-value text-sm">{connectionStatus}</div>
        </div>
      </div>

      {/* ================= Events ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Events</CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[420px] pr-4">
            {events.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Waiting for events…
              </p>
            )}

            <div className="space-y-4">
              {events.map((event, index) => (
                <Card key={index} className="border-l-4 border-primary">
                  <CardContent className="space-y-2 p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {event.entity_type}
                        </span>
                        <Badge variant={eventVariant(event.event_type)}>
                          {event.event_type}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {event.receivedAt}
                      </span>
                    </div>

                    {/* Meta */}
                    {event.entity_id && (
                      <p className="text-xs text-muted-foreground">
                        <strong>ID:</strong> {event.entity_id}
                      </p>
                    )}

                    <Separator />

                    {/* Payload */}
                    {event.data && (
                      <details className="group">
                        <summary className="cursor-pointer text-sm text-primary">
                          View payload
                        </summary>
                        <pre className="mt-2 max-h-48 overflow-auto rounded-md bg-muted p-3 text-xs">
                          {JSON.stringify(event.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
