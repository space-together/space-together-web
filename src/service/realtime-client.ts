// realtime-client.ts
interface RealtimeEvent {
  event_type: string;
  entity_type: string;
  entity_id?: string;
  data: any;
  timestamp: string;
  school_id?: string;
  target_user_id?: string;
}

type EventCallback = (event: RealtimeEvent) => void;
type EventUnsubscribe = () => void;

type ConnectionContext = "school" | "global";

class RealtimeClient {
  private eventSource: EventSource | null = null;
  private callbacks: Map<string, EventCallback[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private baseUrl: string;
  private isBrowser: boolean;
  private isConnecting = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private connectionContext: ConnectionContext = "global";
  private authToken: string | null = null;
  private schoolToken: string | null = null;

  private connectionState: "disconnected" | "connecting" | "connected" =
    "disconnected";

  private static MAX_CONCURRENT_CONNECTIONS = 3;
  private static activeConnections = 0;

  constructor(baseUrl: string = "http://127.0.0.1:4646") {
    this.baseUrl = baseUrl;
    this.isBrowser = typeof window !== "undefined";

    if (this.isBrowser) {
      window.addEventListener("beforeunload", () => {
        this.cleanup();
      });
    }
  }

  /**
   * Set connection context (school or global)
   */
  setContext(
    context: ConnectionContext,
    authToken: string,
    schoolToken?: string,
  ) {
    const contextChanged = this.connectionContext !== context;
    const tokenChanged =
      this.authToken !== authToken || this.schoolToken !== schoolToken;

    this.connectionContext = context;
    this.authToken = authToken;
    this.schoolToken = schoolToken || null;

    console.log(`🔧 Context set to: ${context}`, {
      hasSchoolToken: !!schoolToken,
      contextChanged,
      tokenChanged,
    });

    // Reconnect if context or tokens changed
    if ((contextChanged || tokenChanged) && this.isConnected()) {
      console.log("🔄 Context/token changed, reconnecting...");
      this.refresh();
    }
  }

  /**
   * Get the appropriate SSE endpoint based on context
   */
  private getEndpoint(): string {
    if (this.connectionContext === "school") {
      return `${this.baseUrl}/school/events/stream`;
    }
    return `${this.baseUrl}/events/stream`;
  }

  /**
   * Get headers for EventSource connection
   */
  private getConnectionUrl(): string {
    const endpoint = this.getEndpoint();

    // For school context, we need to add tokens as query params or use withCredentials
    // Note: EventSource doesn't support custom headers directly
    // You may need to pass tokens via URL params if your backend supports it
    // Or ensure cookies are properly set

    return endpoint;
  }

  async connect(): Promise<void> {
    if (!this.isBrowser) {
      throw new Error("EventSource not available in SSR");
    }

    if (this.isConnecting) {
      console.log("🔄 Already connecting, skipping...");
      return;
    }

    if (this.connectionState === "connected") {
      console.log("🔄 Already connected, skipping...");
      return;
    }

    if (
      RealtimeClient.activeConnections >=
      RealtimeClient.MAX_CONCURRENT_CONNECTIONS
    ) {
      throw new Error("Too many concurrent real-time connections");
    }

    if (!this.authToken) {
      throw new Error("Authentication token required for realtime connection");
    }

    this.isConnecting = true;
    this.connectionState = "connecting";
    RealtimeClient.activeConnections++;

    return new Promise((resolve, reject) => {
      try {
        this.cleanup();

        const endpoint = this.getConnectionUrl();
        console.log(`🔄 Creating EventSource connection to: ${endpoint}`);

        // Create EventSource with credentials
        this.eventSource = new EventSource(endpoint, {
          withCredentials: true,
        });

        const onOpen = () => {
          console.log(`✅ Connected to ${this.connectionContext} event stream`);
          this.connectionState = "connected";
          this.isConnecting = false;
          this.reconnectAttempts = 0;

          this.eventSource!.removeEventListener("open", onOpen);
          this.eventSource!.removeEventListener("error", onError);

          resolve();
        };

        const onError = (error: Event) => {
          console.error(
            `❌ EventSource connection error (${this.connectionContext}):`,
            error,
          );
          this.isConnecting = false;
          this.connectionState = "disconnected";
          RealtimeClient.activeConnections = Math.max(
            0,
            RealtimeClient.activeConnections - 1,
          );

          this.eventSource!.removeEventListener("open", onOpen);
          this.eventSource!.removeEventListener("error", onError);

          this.handleReconnection();
          reject(error);
        };

        this.eventSource.addEventListener("open", onOpen);
        this.eventSource.addEventListener("error", onError);

        this.eventSource.onmessage = (event) => {
          try {
            const data: RealtimeEvent = JSON.parse(event.data);
            this.handleEvent(data);
          } catch (error) {
            console.error("Error parsing real-time event:", error);
          }
        };

        const timeoutId = setTimeout(() => {
          if (this.isConnecting) {
            console.error("❌ Connection timeout");
            this.isConnecting = false;
            this.connectionState = "disconnected";
            RealtimeClient.activeConnections = Math.max(
              0,
              RealtimeClient.activeConnections - 1,
            );

            this.cleanup();
            reject(new Error("Connection timeout"));
          }
        }, 10000);

        this.eventSource.addEventListener(
          "open",
          () => {
            clearTimeout(timeoutId);
          },
          { once: true },
        );
      } catch (error) {
        this.isConnecting = false;
        this.connectionState = "disconnected";
        RealtimeClient.activeConnections = Math.max(
          0,
          RealtimeClient.activeConnections - 1,
        );
        reject(error);
      }
    });
  }

  subscribe(entityType: string, callback: EventCallback): EventUnsubscribe {
    if (!this.callbacks.has(entityType)) {
      this.callbacks.set(entityType, []);
    }

    const callbacks = this.callbacks.get(entityType)!;

    if (callbacks.includes(callback)) {
      console.warn("🔄 Callback already subscribed, skipping...");
      return () => this.unsubscribe(entityType, callback);
    }

    callbacks.push(callback);

    console.log(
      `✅ Subscribed to ${entityType} (${this.connectionContext}), total callbacks: ${callbacks.length}`,
    );

    if (this.isBrowser && !this.eventSource && this.shouldConnect()) {
      setTimeout(() => {
        if (this.shouldConnect()) {
          this.connect().catch((error) => {
            console.warn("🔄 Auto-connect failed:", error);
          });
        }
      }, 500);
    }

    return () => {
      this.unsubscribe(entityType, callback);
    };
  }

  subscribeToAll(callback: EventCallback): EventUnsubscribe {
    return this.subscribe("*", callback);
  }

  unsubscribe(entityType: string, callback: EventCallback): void {
    const callbacks = this.callbacks.get(entityType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
        console.log(
          `🔄 Unsubscribed from ${entityType}, remaining callbacks: ${callbacks.length}`,
        );

        if (callbacks.length === 0) {
          this.callbacks.delete(entityType);
        }
      }
    }

    if (this.callbacks.size === 0) {
      setTimeout(() => {
        if (this.callbacks.size === 0) {
          this.disconnect();
        }
      }, 5000);
    }
  }

  unsubscribeAll(entityType: string): void {
    const callbacks = this.callbacks.get(entityType);
    if (callbacks) {
      console.log(
        `🔄 Unsubscribing all callbacks for ${entityType}, count: ${callbacks.length}`,
      );
    }
    this.callbacks.delete(entityType);

    if (this.callbacks.size === 0) {
      setTimeout(() => {
        if (this.callbacks.size === 0) {
          this.disconnect();
        }
      }, 5000);
    }
  }

  private shouldConnect(): boolean {
    const hasSubscribers = this.callbacks.size > 0;
    const notConnected = !this.isConnected() && !this.isConnecting;
    const hasAuth = !!this.authToken;
    const shouldConnect = hasSubscribers && notConnected && hasAuth;

    console.log(
      `🔌 Connection check: subscribers=${hasSubscribers}, connected=${this.isConnected()}, connecting=${this.isConnecting}, hasAuth=${hasAuth} => shouldConnect=${shouldConnect}`,
    );

    return shouldConnect;
  }

  private handleEvent(event: RealtimeEvent) {
    console.log(
      `📨 Incoming event (${this.connectionContext}): ${event.entity_type}::${event.event_type}`,
      {
        entity_id: event.entity_id,
        school_id: event.school_id,
        target_user_id: event.target_user_id,
      },
    );

    // Call all global callbacks
    const globalCallbacks = this.callbacks.get("*") || [];
    globalCallbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error("Error in global callback:", error);
      }
    });

    // Call entity-specific callbacks
    const entityCallbacks = this.callbacks.get(event.entity_type) || [];
    console.log(
      `📢 Delivering to ${globalCallbacks.length} global and ${entityCallbacks.length} entity callbacks`,
    );

    entityCallbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error(`Error in ${event.entity_type} callback:`, error);
      }
    });
  }

  private handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("🔔 Max reconnection attempts reached, giving up");
      this.reconnectAttempts = 0;
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);

    console.log(
      `🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
    );

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      if (this.shouldConnect()) {
        this.connect().catch((error) => {
          console.warn("🔄 Reconnection attempt failed:", error);
        });
      } else {
        console.log("🔄 No need to reconnect, no active subscribers");
        this.reconnectAttempts = 0;
      }
    }, delay);
  }

  private cleanup() {
    console.log("🔄 Cleaning up resources");

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.isConnecting = false;
    this.connectionState = "disconnected";
  }

  disconnect() {
    console.log("🔄 Manual disconnect called");
    this.cleanup();
    this.reconnectAttempts = 0;

    if (RealtimeClient.activeConnections > 0) {
      RealtimeClient.activeConnections--;
    }
  }

  isConnected(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const isOpen = this.eventSource?.readyState === EventSource.OPEN;
    const isConnected = this.connectionState === "connected" && isOpen;

    return isConnected;
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected(),
      isConnecting: this.isConnecting,
      connectionState: this.connectionState,
      connectionContext: this.connectionContext,
      hasAuth: !!this.authToken,
      hasSchoolToken: !!this.schoolToken,
      reconnectAttempts: this.reconnectAttempts,
      activeSubscribers: this.callbacks.size,
      totalCallbacks: Array.from(this.callbacks.values()).reduce(
        (sum, cbs) => sum + cbs.length,
        0,
      ),
      globalConnections: RealtimeClient.activeConnections,
    };
  }

  async refresh(): Promise<void> {
    console.log("🔄 Refreshing connection");
    this.disconnect();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (this.shouldConnect()) {
      return this.connect();
    }
  }

  getSubscribedEntities(): string[] {
    return Array.from(this.callbacks.keys());
  }

  getContext(): ConnectionContext {
    return this.connectionContext;
  }
}

// Create a singleton instance
export const realtimeClient = new RealtimeClient();

// Export for debugging
if (typeof window !== "undefined") {
  (window as any).realtimeClient = realtimeClient;
}
