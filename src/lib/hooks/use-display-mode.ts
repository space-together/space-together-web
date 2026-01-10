"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type DisplayMode = "card" | "table";

export function useDisplayMode(page?: string) {
  const storageKey = useMemo(
    () => (page ? `displayMode_${page}` : "displayMode"),
    [page],
  );

  const [displayMode, setDisplayMode] = useState<DisplayMode>("card");

  // Load saved mode for this page on mount / page change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(storageKey);
    if (saved === "card" || saved === "table") {
      setDisplayMode(saved);
    }
  }, [storageKey]);

  // Change mode + save for this page
  const changeDisplayMode = useCallback(
    (mode: DisplayMode) => {
      setDisplayMode(mode);
      localStorage.setItem(storageKey, mode);

      // Notify same-tab listeners
      window.dispatchEvent(
        new CustomEvent("displayModeChange", {
          detail: { key: storageKey },
        }),
      );
    },
    [storageKey],
  );

  // Sync across tabs & components
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === storageKey &&
        (e.newValue === "card" || e.newValue === "table")
      ) {
        setDisplayMode(e.newValue);
      }
    };

    const handleCustom = (e: Event) => {
      const event = e as CustomEvent<{ key: string }>;
      if (event.detail?.key !== storageKey) return;

      const saved = localStorage.getItem(storageKey);
      if (saved === "card" || saved === "table") {
        setDisplayMode(saved);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("displayModeChange", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("displayModeChange", handleCustom);
    };
  }, [storageKey]);

  return { displayMode, changeDisplayMode };
}
