import { LIMIT } from "@/lib/env";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseFilterDataProps<T> {
  auth: AuthContext;
  initialData?:
    | Paginated<T>
    | { users: T[]; total_pages: number; current_page: number };
  endpoint: string;
  realtimeKey: string;
}

export const useFilterData = <T extends { id?: string; _id?: string }>({
  auth,
  initialData,
  endpoint,
  realtimeKey,
}: UseFilterDataProps<T>) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const isDefault = useRef(true);

  // Normalize initial items (some of your types use .users, others use .data)
  const initialItems =
    (initialData as any)?.data || (initialData as any)?.users || [];

  const [pagination, setPagination] = useState({
    total_pages: initialData?.total_pages || 0,
    current_page: initialData?.current_page || 1,
  });

  const { data, addItem, deleteItem } = useRealtimeData<T>(realtimeKey as any);

  // Helper to clear current list and add new items
  const refreshItems = useCallback(
    (newItems: T[]) => {
      data.forEach((item) => deleteItem(item._id || item.id || ""));
      newItems.forEach(addItem);
    },
    [data, addItem, deleteItem],
  );

  // Load initial data ONCE
  useEffect(() => {
    if (initialItems.length > 0) {
      initialItems.forEach(addItem);
    }
  }, []);

  const fetchData = useCallback(
    async (page: number, filterValue: string) => {
      setLoading(true);
      try {
        const skip = (page - 1) * LIMIT;
        const params = new URLSearchParams({
          limit: LIMIT.toString(),
          skip: skip.toString(),
        });
        if (filterValue) params.set("filter", filterValue);

        const res = await apiRequest<void, any>(
          "get",
          `${endpoint}${endpoint.includes("?") ? "&" : "?"}${params.toString()}`,
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
            realtime: realtimeKey,
          },
        );

        if (res?.data) {
          const items = res.data.data || res.data.users || [];
          refreshItems(items);
          setPagination({
            total_pages: res.data.total_pages,
            current_page: res.data.current_page,
          });
          isDefault.current = false;
        }
      } catch (e) {
        console.error(`Failed to fetch ${realtimeKey}:`, e);
      } finally {
        setLoading(false);
      }
    },
    [auth, endpoint, realtimeKey, refreshItems],
  );

  const handleSearch = (value: string) => {
    setFilter(value);
    if (!value) {
      refreshItems(initialItems);
      setPagination({
        total_pages: initialData?.total_pages || 0,
        current_page: initialData?.current_page || 1,
      });
      isDefault.current = true;
      return;
    }
    fetchData(1, value);
  };

  return {
    loading,
    filter,
    pagination,
    handleSearch,
    handlePageChange: (page: number) => fetchData(page, filter),
  };
};
