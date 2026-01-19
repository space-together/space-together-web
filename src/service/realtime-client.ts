// realtime-client-fetch.ts
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
  private abortController: AbortController | null = null;
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

    if ((contextChanged || tokenChanged) && this.isConnected()) {
      console.log("🔄 Context/token changed, reconnecting...");
      this.refresh();
    }
  }

  private getEndpoint(): string {
    if (this.connectionContext === "school") {
      return `${this.baseUrl}/school/events/stream`;
    }
    return `${this.baseUrl}/events/stream`;
  }

  async connect(): Promise<void> {
    if (!this.isBrowser) {
      throw new Error("Fetch API not available in SSR");
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

    if (this.connectionContext === "school" && !this.schoolToken) {
      throw new Error("School token required for school context");
    }

    this.isConnecting = true;
    this.connectionState = "connecting";
    RealtimeClient.activeConnections++;

    return new Promise(async (resolve, reject) => {
      try {
        this.cleanup();

        const endpoint = this.getEndpoint();
        console.log(`🔄 Creating Fetch SSE connection to: ${endpoint}`);

        this.abortController = new AbortController();

        // Build headers just like your axios config
        const headers: HeadersInit = {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Accept: "text/event-stream",
        };

        // Add Authorization header
        if (this.authToken) {
          headers["Authorization"] = `Bearer ${this.authToken}`;
        }

        // Add School-Token header for school context
        if (this.connectionContext === "school" && this.schoolToken) {
          headers["School-Token"] = this.schoolToken;
        }

        console.log("📤 Sending SSE request with headers:", {
          hasAuth: !!headers["Authorization"],
          hasSchoolToken: !!headers["School-Token"],
        });

        const response = await fetch(endpoint, {
          method: "GET",
          headers,
          signal: this.abortController.signal,
          credentials: "include", // Send cookies
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (!response.body) {
          throw new Error("Response body is null");
        }

        console.log(`✅ Connected to ${this.connectionContext} event stream`);
        this.connectionState = "connected";
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        resolve();

        // Process SSE stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            console.log("🔌 SSE stream ended");
            this.connectionState = "disconnected";
            this.handleReconnection();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              try {
                const event: RealtimeEvent = JSON.parse(data);
                this.handleEvent(event);
              } catch (error) {
                console.error("Error parsing SSE data:", error, data);
              }
            }
          }
        }
      } catch (error) {
        this.isConnecting = false;
        this.connectionState = "disconnected";
        RealtimeClient.activeConnections = Math.max(
          0,
          RealtimeClient.activeConnections - 1,
        );

        if (error instanceof Error && error.name === "AbortError") {
          console.log("🔄 Connection aborted");
        } else {
          console.error("❌ SSE connection error:", error);
          this.handleReconnection();
          reject(error);
        }
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

    if (this.isBrowser && !this.abortController && this.shouldConnect()) {
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
    const hasRequiredTokens =
      this.connectionContext === "school" ? !!this.schoolToken : true;
    const shouldConnect =
      hasSubscribers && notConnected && hasAuth && hasRequiredTokens;

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

    const globalCallbacks = this.callbacks.get("*") || [];
    globalCallbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error("Error in global callback:", error);
      }
    });

    const entityCallbacks = this.callbacks.get(event.entity_type) || [];
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

    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
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

    return this.connectionState === "connected";
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

export const realtimeClient = new RealtimeClient();

if (typeof window !== "undefined") {
  (window as any).realtimeClient = realtimeClient;
}
