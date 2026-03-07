// useWebSocket.ts
// Hook for WebSocket connection and realtime updates

import { useCallback, useEffect, useRef, useState } from "react";
import type { WebSocketMessage } from "./types";

const WS_BASE = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4646";
const PING_INTERVAL = 30000; // 30 seconds
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000; // 1 second

interface UseWebSocketOptions {
  conversationId: string;
  onMessageCreated?: (data: any) => void;
  onMessageRead?: (data: any) => void;
  onMessageDeleted?: (data: any) => void;
  enabled?: boolean;
}

export function useWebSocket({
  conversationId,
  onMessageCreated,
  onMessageRead,
  onMessageDeleted,
  enabled = true,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (!enabled || !conversationId) return;

    try {
      const ws = new WebSocket(`${WS_BASE}/m/ws/${conversationId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        retryCountRef.current = 0;

        // Start ping interval
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping" }));
          }
        }, PING_INTERVAL);
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          switch (message.type) {
            case "message_created":
              onMessageCreated?.(message.data);
              break;
            case "message_read":
              onMessageRead?.(message.data);
              break;
            case "message_deleted":
              onMessageDeleted?.(message.data);
              break;
            case "pong":
              // Server acknowledged ping
              break;
            default:
              console.warn("Unknown WebSocket message type:", message.type);
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError(new Error("WebSocket connection error"));
      };

      ws.onclose = () => {
        setIsConnected(false);
        cleanup();

        // Retry with exponential backoff
        if (retryCountRef.current < MAX_RETRIES) {
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCountRef.current);
          retryCountRef.current++;

          retryTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          setError(new Error("Max WebSocket reconnection attempts reached"));
        }
      };
    } catch (err) {
      setError(err as Error);
    }
  }, [conversationId, enabled, onMessageCreated, onMessageRead, onMessageDeleted]);

  useEffect(() => {
    connect();
    return cleanup;
  }, [connect, cleanup]);

  const disconnect = useCallback(() => {
    cleanup();
    setIsConnected(false);
  }, [cleanup]);

  return {
    isConnected,
    error,
    disconnect,
    reconnect: connect,
  };
}
