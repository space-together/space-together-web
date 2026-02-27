// messaging.socket.ts
// WebSocket client for real-time messaging

const WS_BASE = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4646";
const PING_INTERVAL = 30000; // 30 seconds
const MAX_RETRY = 5;
const INITIAL_RETRY_DELAY = 5000; // 5 seconds

export type MessageEventType =
  | "message_created"
  | "message_read"
  | "message_deleted"
  | "pong";

export interface MessageSocketEvent {
  type: MessageEventType;
  data: any;
}

export type MessageEventHandler = (event: MessageSocketEvent) => void;

class MessagingSocket {
  private ws: WebSocket | null = null;
  private conversationId: string | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private retryCount = 0;
  private retryTimeout: NodeJS.Timeout | null = null;
  private handlers: Map<MessageEventType, MessageEventHandler[]> = new Map();
  private isManualDisconnect = false;

  connectToConversation(conversationId: string, authToken?: string): void {
    if (this.ws && this.conversationId === conversationId) {
      console.log("Already connected to conversation:", conversationId);
      return;
    }

    this.disconnect();
    this.conversationId = conversationId;
    this.isManualDisconnect = false;

    const url = authToken
      ? `${WS_BASE}/m/ws/${conversationId}?token=${authToken}`
      : `${WS_BASE}/m/ws/${conversationId}`;

    console.log("Connecting to conversation WebSocket:", conversationId);

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("WebSocket connected to conversation:", conversationId);
      this.retryCount = 0;
      this.startPing();
    };

    this.ws.onmessage = (event) => {
      try {
        const message: MessageSocketEvent = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket closed");
      this.stopPing();

      if (!this.isManualDisconnect && this.retryCount < MAX_RETRY) {
        this.scheduleReconnect();
      }
    };
  }

  disconnect(): void {
    this.isManualDisconnect = true;
    this.stopPing();

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.conversationId = null;
    this.retryCount = 0;
  }

  sendPing(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "ping" }));
    }
  }

  on(eventType: MessageEventType, handler: MessageEventHandler): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }

    this.handlers.get(eventType)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.handlers.get(eventType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  off(eventType: MessageEventType, handler: MessageEventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  getRetryCount(): number {
    return this.retryCount;
  }

  private startPing(): void {
    this.stopPing();
    this.pingInterval = setInterval(() => {
      this.sendPing();
    }, PING_INTERVAL);
  }

  private stopPing(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private scheduleReconnect(): void {
    this.retryCount++;
    const delay = INITIAL_RETRY_DELAY * Math.pow(2, this.retryCount - 1);

    console.log(
      `Scheduling reconnect attempt ${this.retryCount}/${MAX_RETRY} in ${delay}ms`
    );

    this.retryTimeout = setTimeout(() => {
      if (this.conversationId && !this.isManualDisconnect) {
        this.connectToConversation(this.conversationId);
      }
    }, delay);
  }

  private handleMessage(message: MessageSocketEvent): void {
    const handlers = this.handlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(message);
        } catch (error) {
          console.error(`Error in ${message.type} handler:`, error);
        }
      });
    }
  }
}

export const messagingSocket = new MessagingSocket();

// Expose for debugging
if (typeof window !== "undefined") {
  (window as any).messagingSocket = messagingSocket;
}
