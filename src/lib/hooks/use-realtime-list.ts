"use client";

import type { WithId } from "@/lib/mode/with-id";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { useEffect, useState } from "react";

export function useRealtimeList<T extends WithId>(
  channel: string,
  initialData: T[],
  realtimeEnabled: boolean = true,
) {
  const { data } = useRealtimeData<T>(channel);
  const [displayData, setDisplayData] = useState<T[]>(initialData);

  useEffect(() => {
    if (realtimeEnabled && data) {
      setDisplayData(data as T[]);
    } else if (!realtimeEnabled) {
      setDisplayData(initialData);
    }
  }, [data, realtimeEnabled, initialData]);

  return displayData;
}

export function useRealtimeItem<T extends WithId>(
  channel: string,
  initialItem: T,
  realtimeEnabled: boolean = true,
) {
  const { data } = useRealtimeData<T>(channel);
  const [item, setItem] = useState<T>(initialItem);

  useEffect(() => {
    if (!realtimeEnabled || !data?.length) return;

    const updated = data.find((d) => d._id === initialItem._id);
    if (updated) {
      setItem(updated);
    }
  }, [data, realtimeEnabled, initialItem._id]);

  return item;
}
