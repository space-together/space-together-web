"use client";

import { useRealtimeImproved } from "@/lib/hooks/useRealtimeImproved";
import type { WithId } from "@/lib/mode/with-id";
import { cn } from "@/lib/utils";
import { realtimeClient } from "@/service/realtime-client";
import { createContext, useContext, useEffect, useReducer } from "react";

type ChannelName = string;

type RealtimeAction<T extends WithId> =
  | { type: "set"; channel: ChannelName; payload: T[] }
  | { type: "add"; channel: ChannelName; payload: T }
  | { type: "update"; channel: ChannelName; payload: T }
  | { type: "delete"; channel: ChannelName; payload: string };

type RealtimeState<T extends WithId> = Record<ChannelName, T[]>;

function realtimeReducer<T extends WithId>(
  state: RealtimeState<T>,
  action: RealtimeAction<T>,
): RealtimeState<T> {
  const current = state[action.channel] || [];

  switch (action.type) {
    case "set":
      return { ...state, [action.channel]: action.payload };

    case "add": {
      const newItem = action.payload;
      const id = newItem._id || newItem.id;
      if (current.some((i) => (i._id || i.id) === id)) return state;

      const updated = [...current, newItem].sort((a, b) => {
        const dateA =
          "updated_at" in a && a.updated_at
            ? new Date(a.updated_at as Date | string).getTime()
            : 0;
        const dateB =
          "updated_at" in b && b.updated_at
            ? new Date(b.updated_at as Date | string).getTime()
            : 0;
        return dateB - dateA; // Newest first (descending)
      });

      return { ...state, [action.channel]: updated };
    }

    case "update": {
      const item = action.payload;
      const id = item._id || item.id;

      const updated = current
        .map((i) => ((i._id || i.id) === id ? item : i))
        .sort((a, b) => {
          const dateA =
            "updated_at" in a && a.updated_at
              ? new Date(a.updated_at as Date | string).getTime()
              : 0;
          const dateB =
            "updated_at" in b && b.updated_at
              ? new Date(b.updated_at as Date | string).getTime()
              : 0;
          return dateB - dateA;
        });

      return {
        ...state,
        [action.channel]: updated,
      };
    }

    case "delete": {
      const id = action.payload;
      return {
        ...state,
        [action.channel]: current.filter((i) => (i._id || i.id) !== id),
      };
    }
    default:
      return state;
  }
}

type ChannelConfig<T extends WithId> = {
  name: ChannelName;
  initialData: T[];
  enabled?: boolean;
};

type ConnectionContext = "school" | "global";

type RealtimeContextType<T extends WithId> = {
  state: RealtimeState<T>;
  isConnected: Record<ChannelName, boolean>;
  addItem: (channel: ChannelName, item: T) => void;
  updateItem: (channel: ChannelName, item: T) => void;
  deleteItem: (channel: ChannelName, id: string) => void;
};

const RealtimeContext = createContext<RealtimeContextType<any> | null>(null);

type RealtimeProviderProps<T extends WithId> =
  | {
      /** Single-channel mode */
      channel: string;
      initialData: T[];
      className?: string;
      children: React.ReactNode;
      enabled?: boolean;
      context?: ConnectionContext;
      authToken: string;
      schoolToken?: string | null;
    }
  | {
      /** Multi-channel mode */
      channels: ChannelConfig<T>[];
      className?: string;
      children: React.ReactNode;
      context?: ConnectionContext;
      authToken: string;
      schoolToken?: string | null;
    };

export function RealtimeProvider<T extends WithId>(
  props: RealtimeProviderProps<T>,
) {
  const channels =
    "channel" in props
      ? [
          {
            name: props.channel,
            initialData: props.initialData,
            enabled: props.enabled ?? true,
          },
        ]
      : props.channels;

  const { className, children, authToken, schoolToken } = props;
  const context = props.context || (schoolToken ? "school" : "global");

  const initialState = Object.fromEntries(
    channels.map((c) => [c.name, c.initialData]),
  ) as RealtimeState<T>;

  const [state, dispatch] = useReducer(realtimeReducer<T>, initialState);
  const connectionMap: Record<string, boolean> = {};

  // Set connection context when component mounts or auth changes
  useEffect(() => {
    console.log("🔧 Setting realtime context:", {
      context,
      hasSchoolToken: !!schoolToken,
      hasAuthToken: !!authToken,
    });

    realtimeClient.setContext(context, authToken, schoolToken || undefined);
  }, [context, authToken, schoolToken]);

  channels.forEach(({ name, enabled = true }) => {
    if (!enabled) {
      connectionMap[name] = false;
      return;
    }

    const { isConnected } = useRealtimeImproved<T>(
      name,
      (created) => dispatch({ type: "add", channel: name, payload: created }),
      (updated) =>
        dispatch({ type: "update", channel: name, payload: updated }),
      (deletedId) =>
        dispatch({ type: "delete", channel: name, payload: deletedId }),
    );
    connectionMap[name] = isConnected;
  });

  const addItem = (channel: ChannelName, item: T) =>
    dispatch({ type: "add", channel, payload: item });
  const updateItem = (channel: ChannelName, item: T) =>
    dispatch({ type: "update", channel, payload: item });
  const deleteItem = (channel: ChannelName, id: string) =>
    dispatch({ type: "delete", channel, payload: id });

  return (
    <RealtimeContext.Provider
      value={{
        state,
        isConnected: connectionMap,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      <section className={cn("space-y-4", className)}>{children}</section>
    </RealtimeContext.Provider>
  );
}

export function useRealtimeData<T extends WithId>(
  channel: string,
  enabled: boolean = true,
) {
  const ctx = useContext(RealtimeContext);
  if (!ctx) throw new Error("useRealtimeData must be inside RealtimeProvider");

  const data = ctx.state[channel] || [];
  const connected = enabled ? (ctx.isConnected[channel] ?? false) : false;

  return {
    data: data as T[],
    isConnected: connected,
    addItem: (item: T) => ctx.addItem(channel, item),
    updateItem: (item: T) => ctx.updateItem(channel, item),
    deleteItem: (id: string) => ctx.deleteItem(channel, id),
  };
}
